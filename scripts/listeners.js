import { generateQRCodeData } from './core.js';
import { setSpinner, toggleQRCodeSection, renderQRCode, showFlyAlert } from './render.js';
import { getQRCodeImg, createDownloadLink } from './dom-utils.js';
import { copyQRCodeImageToClipboard } from './clipboard.js';

// 📥 Handles QR code generation from user input
document.getElementById("generate").addEventListener("click", async () => {
  const inputEl = document.getElementById("urlInput");
  const config = generateQRCodeData(inputEl);

  if (config) {
    setSpinner(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    toggleQRCodeSection(true);
    const qrcodeEl = document.getElementById("qrcode");
    renderQRCode(qrcodeEl, config);
    setSpinner(false);
  } else {
    showFlyAlert("Por favor, insira uma URL válida.", "warning");
  }
});

// 💾 Enables QR code image download
document.getElementById("download").addEventListener("click", () => {
  const qrcodeContainer = document.getElementById("qrcode");
  const imgElement = getQRCodeImg(qrcodeContainer);

  if (imgElement) {
    const link = createDownloadLink(imgElement.src);
    link.click();
  } else {
    showFlyAlert("QR Code não encontrado.", "error");
  }
});

// 📋 Handles QR code image copying to clipboard
document.getElementById("reset").addEventListener("click", async () => {
  const qrcodeContainer = document.getElementById("qrcode");
  const success = await copyQRCodeImageToClipboard(qrcodeContainer);

  showFlyAlert(
    success
      ? "Imagem do QR Code copiada para a área de transferência!"
      : "Falha ao copiar a imagem do QR Code.",
    success ? "success" : "error"
  );
});
