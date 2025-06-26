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

const showAlert = (message) => window.alert(message);

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
    showAlert("Por favor, insira uma URL válida.");
  }
});
