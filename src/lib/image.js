const MAX_FILE_BYTES = 15 * 1024 * 1024;
const MAX_SIDE = 1600; // big enough to read text, small enough to send quickly

/**
 * Turns a picked or dropped image file into a smaller JPEG data URL.
 * Throws an Error with a plain-language message if the file can't be used.
 */
export async function prepareScreenshot(file) {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('That file is not a picture. Please choose a screenshot or photo.');
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error('That picture is too large. Please choose one under 15 MB.');
  }

  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
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
      name: file.name || 'Pasted picture',
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error("We couldn't open that picture. Please try a different one."));
    img.src = src;
  });
}
