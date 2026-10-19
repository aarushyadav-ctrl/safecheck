const MAX_FILE_BYTES = 15 * 1024 * 1024;
const MAX_SIDE = 1600; // big enough to read text, small enough to send quickly

/** An error with a code the screen turns into plain words (image.errors.<code>). */
export class ImageError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

/**
 * Turns a picked or dropped image file into a smaller JPEG data URL.
 * Throws an ImageError if the file can't be used.
 */
export async function prepareScreenshot(file) {
  if (!file || !file.type.startsWith('image/')) throw new ImageError('notImage');
  if (file.size > MAX_FILE_BYTES) throw new ImageError('tooBig');

  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new ImageError('cantOpen'));
      el.src = url;
    });
    const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff'; // transparent screenshots become white, not black
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return {
      dataUrl: canvas.toDataURL('image/jpeg', 0.86),
      name: file.name || '',
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}
