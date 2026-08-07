function isValidMfeUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

function resolveMfeUrl(
  envValue: string | undefined,
  devDefault: string,
  prodDefault: string,
): string {
  const trimmed = envValue?.trim();

  // Vercel "Sensitive" NEXT_PUBLIC_* vars are redacted to "[SENSITIVE]" in client bundles — ignore them.
  if (trimmed && trimmed !== "[SENSITIVE]" && isValidMfeUrl(trimmed)) {
    return trimmed.replace(/\/$/, "");
  }

  return process.env.NODE_ENV === "production" ? prodDefault : devDefault;
}

export const MFE_SHELL_URL = resolveMfeUrl(
  process.env.NEXT_PUBLIC_MFE_SHELL_URL,
  "http://localhost:3001",
  "https://abd-mfe-shell.vercel.app",
);

export const MFE_STATE_URL = resolveMfeUrl(
  process.env.NEXT_PUBLIC_MFE_STATE_URL,
  "http://localhost:3002",
  "https://abd-mfe-state.vercel.app",
);

export const MFE_SHELL_ENTRY = `${MFE_SHELL_URL}/assets/remoteEntry.js`;
export const MFE_STATE_ENTRY = `${MFE_STATE_URL}/assets/remoteEntry.js`;
