import { setElementVisibility } from "./dom-utils.js";

// 🎨 Injects QR code into the given container
export const renderQRCode = (container, config) => {
  container.innerHTML = "";
  new QRCode(container, config);
};

// 🔁 Toggles between input and QR sections
export const toggleQRCodeSection = (isVisible) => {
  [".qrcode-container", ".input-container"].forEach(selector =>
    setElementVisibility(
      document.querySelector(selector),
      selector.includes("qrcode") ? isVisible : !isVisible
    )
  );
};

// 💫 Shows or hides the loading spinner
export const setSpinner = (visible) =>
  document.getElementById("spinner").classList.toggle("hidden", !visible);

// 📢 Creates and animates alert message in the UI
export const showFlyAlert = (message, type = "success", duration = 3000) => {
  const alert = Object.assign(document.createElement("div"), {
    className: `fly-alert fly-${type}`,
    textContent: message,
  });

  document.body.appendChild(alert);
  requestAnimationFrame(() => alert.classList.add("show"));
  setTimeout(() => {
    alert.classList.remove("show");
    alert.remove();
  }, duration + 300);
};
