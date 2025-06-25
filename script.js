document.getElementById("generate").addEventListener("click", function() {
  const url = document.getElementById("urlInput").value;
  if (url) {
    const qrCode = new QRCode(document.getElementById("qrcode"), {
      text: url,
      width: 128,
      height: 128,
    });
  } else {
    alert("Please enter a valid URL.");
  }
});
