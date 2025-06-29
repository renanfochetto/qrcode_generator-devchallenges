// 🔍 Validates input and returns QR code config if valid
export const generateQRCodeData = (inputElement) => {
  const value = getInputValue(inputElement);
  return isValidUrl(value) ? createQRCodeConfig(value) : null;
};

// 📦 Retrieves trimmed value from input field
export const getInputValue = (element) => element?.value?.trim() || "";

// ✅ Checks if string follows basic URL pattern
export const isValidUrl = (url) =>
  /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w./?%&=-]*)?$/.test(url);

// 🧱 Produces configuration object for QR code generation
export const createQRCodeConfig = (text) => ({
  text,
  width: 172,
  height: 172,
});
