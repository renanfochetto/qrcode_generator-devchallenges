// 🎛 Toggles visibility via display style
export const setElementVisibility = (element, isVisible) =>
  element.style.display = isVisible ? "flex" : "none";

// 🖼 Grabs <img> element inside the QR code container
export const getQRCodeImg = (container) => container.querySelector("img");

// 🔗 Extracts QR code image source URL
export const getQRCodeSrc = (container) => getQRCodeImg(container)?.src || "";

// 📥 Creates downloadable link element for QR image
export const createDownloadLink = (src, filename = "qrcode.png") => {
  const link = document.createElement("a");
  link.href = src;
  link.download = filename;
  return link;
};
