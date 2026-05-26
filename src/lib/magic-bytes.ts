type Signature = { bytes: number[]; offset?: number };

const SIGNATURES: Record<string, Signature[]> = {
  "application/pdf": [{ bytes: [0x25, 0x50, 0x44, 0x46] }],
  "image/jpeg": [{ bytes: [0xff, 0xd8, 0xff] }],
  "image/png": [{ bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] }],
  "image/gif": [
    { bytes: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61] },
    { bytes: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61] },
  ],
  "image/webp": [{ bytes: [0x52, 0x49, 0x46, 0x46] }],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    { bytes: [0x50, 0x4b, 0x03, 0x04] },
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    { bytes: [0x50, 0x4b, 0x03, 0x04] },
  ],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    { bytes: [0x50, 0x4b, 0x03, 0x04] },
  ],
  "application/zip": [{ bytes: [0x50, 0x4b, 0x03, 0x04] }],
  "application/msword": [{ bytes: [0xd0, 0xcf, 0x11, 0xe0] }],
  "application/vnd.ms-powerpoint": [{ bytes: [0xd0, 0xcf, 0x11, 0xe0] }],
  "application/vnd.ms-excel": [{ bytes: [0xd0, 0xcf, 0x11, 0xe0] }],
};

export function validateMagicBytes(
  buffer: Uint8Array,
  claimedMime: string
): boolean {
  const sigs = SIGNATURES[claimedMime];
  if (!sigs) return false;
  if (sigs.length === 0) return true;
  return sigs.some((sig) => {
    const offset = sig.offset ?? 0;
    return sig.bytes.every((byte, i) => buffer[offset + i] === byte);
  });
}
