/** An error with a code the screen turns into plain words (qr.errors.<code>). */
export class QrError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

const MAX_FILE_BYTES = 15 * 1024 * 1024;

/**
 * Reads a QR code from a photo, in the browser. Nothing is uploaded and the
 * code's link is never opened. Tries a few sizes, because very large or very
 * small photos can hide the code from the reader.
 * @returns the text inside the QR code
 */
export async function readQrFromFile(file) {
  if (!file || !file.type.startsWith('image/')) throw new QrError('notImage');
  if (file.size > MAX_FILE_BYTES) throw new QrError('tooBig');

  // Loaded only when someone scans a code, so the first page stays fast.
  const { default: jsQR } = await import('jsqr');
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new QrError('cantOpen'));
      el.src = url;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    for (const maxSide of [1200, 800, 2000, 500]) {
      const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
      canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(data, width, height, { inversionAttempts: 'attemptBoth' });
      if (code?.data?.trim()) return code.data.trim();
    }
    throw new QrError('notFound');
  } finally {
    URL.revokeObjectURL(url);
  }
}
