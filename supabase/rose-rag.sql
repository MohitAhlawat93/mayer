-- Rose multi-tenant database RAG schema for Supabase/Postgres.
-- Run this once in the Supabase SQL editor.

create extension if not exists pgcrypto with schema extensions;
create extension if not exists pg_trgm with schema extensions;
create extension if not exists vector with schema extensions;

create table if not exists public.rose_tenants (
  id text primary key,
  display_name text not null,
  assistant_name text not null default 'Rose',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rose_sources (
  id uuid primary key default extensions.gen_random_uuid(),
  tenant_id text not null references public.rose_tenants(id) on delete cascade,
  source_type text not null,
  file_name text not null,
  item_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.rose_chunks (
  id uuid primary key default extensions.gen_random_uuid(),
  tenant_id text not null references public.rose_tenants(id) on delete cascade,
  source_id uuid not null references public.rose_sources(id) on delete cascade,
  ordinal integer not null,
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  -- Reserved for a future semantic embedding provider.
  embedding extensions.vector(384),
  search_vector tsvector generated always as (
    to_tsvector('simple', coalesce(content, ''))
  ) stored,
  created_at timestamptz not null default now()
);

create index if not exists rose_sources_tenant_idx
  on public.rose_sources (tenant_id, created_at desc);

create index if not exists rose_chunks_tenant_idx
  on public.rose_chunks (tenant_id);

create index if not exists rose_chunks_source_id_idx
  on public.rose_chunks (source_id);

create index if not exists rose_chunks_search_idx
  on public.rose_chunks using gin (search_vector);

create index if not exists rose_chunks_trgm_idx
  on public.rose_chunks using gin (content extensions.gin_trgm_ops);

alter table public.rose_tenants enable row level security;
alter table public.rose_sources enable row level security;
alter table public.rose_chunks enable row level security;

-- No anon/authenticated policies are created intentionally.
-- Server-side requests use SUPABASE_SERVICE_ROLE_KEY.

create or replace function public.match_rose_chunks(
  p_tenant_id text,
  p_query text,
  p_limit integer default 6
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  score real
)
language sql
stable
security definer
set search_path = ''
as $$
  with q as (
    select websearch_to_tsquery('simple', p_query) as tsq
  )
  select
    c.id,
    c.content,
    c.metadata,
    (
      ts_rank_cd(c.search_vector, q.tsq) * 2.0
      + extensions.similarity(lower(c.content), lower(p_query))
    )::real as score
  from public.rose_chunks c
  cross join q
  where c.tenant_id = p_tenant_id
    and (
      c.search_vector @@ q.tsq
      or extensions.similarity(lower(c.content), lower(p_query)) > 0.05
    )
  order by score desc
  limit greatest(1, least(p_limit, 12));
$$;

revoke all on function public.match_rose_chunks(text, text, integer) from public;
revoke all on function public.match_rose_chunks(text, text, integer) from anon;
revoke all on function public.match_rose_chunks(text, text, integer) from authenticated;
grant execute on function public.match_rose_chunks(text, text, integer) to service_role;
