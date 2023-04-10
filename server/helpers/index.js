import mimeDb from "mime-db";

export function getExtensionFromMimeType(mimeType) {
  // Convert the MIME type to its canonical form
  // Look up the extension in the MIME database
  const extension = mimeDb[mimeType]?.extensions?.[0];

  return extension || "";
}
