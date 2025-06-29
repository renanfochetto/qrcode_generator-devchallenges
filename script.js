// 🧱 Funções puras
const getInputValue = (element) => element?.value?.trim() || "";

const isValidUrl = (url) =>
  /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w./?%&=-]*)?$/.test(url);

const createQRCodeConfig = (text) => ({
  text,
  width: 172,
  height: 172,
});

const setElementVisibility = (element, isVisible) =>
  element.style.display = isVisible ? "flex" : "none";

const toggleQRCodeSection = (show) => {
  const qrCodeSection = document.querySelector(".qrcode-container");
  const inputSection = document.querySelector(".input-container");

  setElementVisibility(qrCodeSection, show);
  setElementVisibility(inputSection, !show);
}

const setSpinner = (visible) =>
  document.getElementById("spinner").classList.toggle("hidden", !visible);

// 🎯 Função principal sem efeito colateral direto
const generateQRCodeData = (inputElement) => {
  const value = getInputValue(inputElement);
  return isValidUrl(value) ? createQRCodeConfig(value) : null;
};

// 🎬 Efeitos colaterais isolados
const renderQRCode = (container, config) => {
  container.innerHTML = ""; // limpar QR anterior
  new QRCode(container, config);
};


// 🚀 Composição funcional no clique
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

const getQRCodeImg = (container) => container.querySelector("img");

const createDownloadLink = (src, filename = "qrcode.png") => {
  const link = document.createElement("a");
  link.href = src;
  link.download = filename;
  return link;
}

document.getElementById("download").addEventListener("click", () => {
  const qrcodeContainer = document.getElementById("qrcode");
  const imgElement = getQRCodeImg(qrcodeContainer);

  if(imgElement) {
    const link = createDownloadLink(imgElement.src);
    link.click();
  } else {
    showFlyAlert("QR Code não encontrado.", "error");
  }
});

const getQRCodeSrc = (container) => getQRCodeImg(container)?.src || "";

const srcToBlob = async (src) => {
  const response = await fetch(src);
  return await response.blob();
}

const createClipboardItem = async (src) => {
  const blob = await srcToBlob(src);
  return new ClipboardItem({ [blob.type]: blob });
}

const copyQRCodeImageToClipboard = async (container) => {
  const src = getQRCodeSrc(container);

  if(!src) return false;

  try {
    const item = await createClipboardItem(src);
    await navigator.clipboard.write([item]);
    return true;
  } catch {
    return false;
  }
}

document.getElementById("reset").addEventListener("click", async () => {
  const qrcodeContainer = document.getElementById("qrcode");
  const success = await copyQRCodeImageToClipboard(qrcodeContainer);

  showFlyAlert(success
    ? "Imagem do QR Code copiada para a área de transferência!"
    : "Falha ao copiar a imagem do QR Code.",
    success ? "success" : "error"
  );
});

const showFlyAlert = (message, type = "success", duration = 3000) => {
  const alert = document.createElement("div");
  alert.className = `fly-alert fly-${type}`;
  alert.textContent = message;

  document.body.appendChild(alert);

  requestAnimationFrame(() => {
    alert.classList.add("show");
    });

  setTimeout(() => {
    alert.classList.remove("show");
    alert.addEventListener("transitionend", () => alert.remove());
  }, duration);
}
