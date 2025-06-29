import { getQRCodeSrc } from './dom-utils.js';

// 📋 Copies QR code image to clipboard
export const copyQRCodeImageToClipboard = async (container) => {
  const src = getQRCodeSrc(container);
  if (!src) return false;

  try {
    const item = await createClipboardItem(src);
    await navigator.clipboard.write([item]);
    return true;
  } catch {
    return false;
  }
};

// 💾 Fetches image from URL and returns Blob
export const srcToBlob = async (src) => {
  const response = await fetch(src);
  return await response.blob();
};

// ✂️ Prepares clipboard item from image blob
export const createClipboardItem = async (src) => {
  const blob = await srcToBlob(src);
  return new ClipboardItem({ [blob.type]: blob });
};
