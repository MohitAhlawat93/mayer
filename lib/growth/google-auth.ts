import "server-only";
import { createSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly";

let tokenCache: { token: string; expiresAt: number } | null = null;

function base64Url(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function getCredentials() {
  const clientEmail =
    process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL?.trim() ||
    process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL?.trim() ||
    "";
  const privateKey = (
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim() ||
    process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY?.trim() ||
    ""
  ).replace(/\\n/g, "\n");

  return { clientEmail, privateKey };
}

export function getGoogleConnectionStatus() {
  const { clientEmail, privateKey } = getCredentials();
  return {
    credentialsConfigured: Boolean(clientEmail && privateKey),
    searchConsoleSiteConfigured: Boolean(
      process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL?.trim() ||
        process.env.NEXT_PUBLIC_SITE_URL?.trim(),
    ),
    analyticsPropertyConfigured: Boolean(
      process.env.GOOGLE_ANALYTICS_PROPERTY_ID?.trim(),
    ),
  };
}

export async function getGoogleAccessToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.token;
  }

  const { clientEmail, privateKey } = getCredentials();
  if (!clientEmail || !privateKey) {
    throw new Error("Google service account credentials are not configured.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      iss: clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      exp: now + 3600,
      iat: now,
    }),
  );
  const unsignedToken = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const signature = base64Url(signer.sign(privateKey));
  const assertion = `${unsignedToken}.${signature}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Google OAuth failed with status ${response.status}.`);
  }

  const data = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
  };

  if (!data.access_token) {
    throw new Error("Google OAuth did not return an access token.");
  }

  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };

  return tokenCache.token;
}
