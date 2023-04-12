const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const resultDiv = document.getElementById('result');

// get user media
// navigator.mediaDevices.getUserMedia({ video: true })
//   .then((stream) => {
//     video.srcObject = stream;
//     video.play();
//   })
//   .catch((err) => {
//     console.log('Error: ' + err.message);
//   });

// scan QR code
function scanQRCode() {
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);

  if (code) {
    resultDiv.textContent = 'QR code scanned: ' + code.data;

    // send data to MongoDB
    const data = { code: code.data };
    fetch('/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log('Data sent to MongoDB:', data))
    .catch(err => console.error('Error sending data to MongoDB:', err));
  }

  requestAnimationFrame(scanQRCode);
}

// start scanning QR code
video.addEventListener('loadedmetadata', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  requestAnimationFrame(scanQRCode);
});