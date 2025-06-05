const espUrl = "http://192.168.1.50";
let failedAttempts = 0;
let isConnected = false;
let disconnectNotified = false;

function toggleButtons(enabled) {
  const buttons = document.querySelectorAll(".button, .mode-button");
  buttons.forEach(btn => btn.disabled = !enabled);
}

async function checkESPConnection() {
  const statusEl = document.getElementById("connection-status");
  if (!statusEl) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(`${espUrl}/dados`, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      if (!isConnected) {
        statusEl.textContent = "🟢 ESP Connected";
        statusEl.classList.add("connected");
        statusEl.classList.remove("disconnected");
        toggleButtons(true);
        isConnected = true;
        disconnectNotified = false;
      }
      failedAttempts = 0;
    } else {
      throw new Error("ESP responded badly.");
    }
  } catch (err) {
    clearTimeout(timeout);
    console.warn("ESP check failed:", err);
    failedAttempts++;
    isConnected = false;
    toggleButtons(true);

    if (failedAttempts >= 3) {
      if (!disconnectNotified) {
        statusEl.textContent = "🔴 ESP Disconnected";
        statusEl.classList.add("disconnected");
        statusEl.classList.remove("connected");
        disconnectNotified = true;
      }
    } else {
      statusEl.textContent = "🔄 Connecting...";
      statusEl.classList.remove("connected", "disconnected");
    }
  }
}

function comando(endpoint) {
  fetch(`${espUrl}/${endpoint}`)
    .then(res => res.text())
    .then(msg => {
      const status = document.getElementById("status-robot");
      if (status) status.textContent = "Comando enviado!";
    })
    .catch(err => {
      console.error("Falha no comando:", err);
    });
}


function drawMiniMap() {
  const canvas = document.getElementById("mini-mapa");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";


  pontos.forEach(p => ctx.fillRect(p.x, p.y, 5, 5));

  ctx.fillStyle = "blue";
  ctx.fillRect(5, 5, 10, 10);
}
