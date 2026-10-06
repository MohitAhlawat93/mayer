# Rose database RAG setup

Rose now supports database-backed, multi-tenant retrieval.

## 1. Create a Supabase project

Create one Supabase project for the product. Multiple profile owners can share the same database because every source and chunk is isolated by `tenant_id`.

## 2. Run the schema

Open the Supabase SQL editor and run:

    supabase/rose-rag.sql

This creates:

- `rose_tenants`
- `rose_sources`
- `rose_chunks`
- full-text + fuzzy indexes
- `match_rose_chunks(...)` retrieval function

RLS is enabled and no public table policies are created. The website uses the server-side service-role key.

## 3. Add Vercel secrets

Add these to the Vercel project and redeploy:

    SUPABASE_URL=https://YOUR_PROJECT.supabase.co
    SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
    ROSE_ADMIN_SECRET=choose-a-long-random-secret
    ROSE_TENANT_ID=anora
    ROSE_OWNER_NAME=Anora
    ROSE_ASSISTANT_NAME=Rose

Keep the existing:

    GROQ_API_KEY=...

Never expose `SUPABASE_SERVICE_ROLE_KEY` or `ROSE_ADMIN_SECRET` with a `NEXT_PUBLIC_` prefix.

Optional during migration:

    ROSE_ALLOW_FILE_FALLBACK=false

Keep this `false` in production once database knowledge is available so one tenant can never fall back to another profile's static file knowledge.

## 4. Upload knowledge

Visit:

    /rose-admin

Enter the same `ROSE_ADMIN_SECRET`, tenant ID, owner name, and assistant name.

Supported ingestion:

- WhatsApp exported .txt
- Telegram exported .json
- CSV with question/answer-style columns
- Markdown
- plain text
- pasted conversations, Q&A, policies, or notes

The original raw file is not stored by the current implementation. It is parsed into searchable chunks. Common phone numbers, emails, long number strings, and payment IDs are redacted during ingestion.

## 5. Retrieval behavior

The public Rose endpoint:

1. reads recent chat history,
2. retrieves only chunks for `ROSE_TENANT_ID`,
3. sends the best chunks to Groq,
4. generates a natural answer,
5. falls back safely if Groq or the database is unavailable.

Mature/adult chat content is not removed simply because it is mature. Rose may answer it in a respectful, matter-of-fact way, but owner-specific claims still need support from retrieved knowledge.

## SaaS direction

The schema already supports many owners. Before opening self-service onboarding to customers, replace the single `ROSE_ADMIN_SECRET` prototype with proper owner authentication and bind each public profile/domain to its tenant server-side.
