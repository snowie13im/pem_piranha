let modoAtual = 0;
const modos = ['Deep Clean', 'Quick Clean', 'Walls Only'];

function selectMode(index) {
  modoAtual = index;
  const buttons = document.querySelectorAll('.mode-option');
  buttons.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
}

function startCleaning() {
  const statusEl = document.getElementById("status-robot");
  if (!statusEl) return;

  if (statusEl.textContent !== "Cleaning...") {
    comando('GPIO=0');
    statusEl.textContent = "Cleaning...";
    statusEl.className = "cleaning";
  }
}

function returnToBase() {
  const statusEl = document.getElementById("status-robot");
  if (!statusEl) return;

  if (statusEl.textContent !== "In Base") {
    comando('GPIO=1');
    statusEl.textContent = "Returning...";
    statusEl.className = "in-base";

    setTimeout(() => {
      statusEl.textContent = "In Base";
    }, 2000);
  }
}

function stopCleaning() {
  const statusEl = document.getElementById("status-robot");
  if (!statusEl) return;

  if (statusEl.textContent !== "Stopped") {
    comando('GPIO=9');
    statusEl.textContent = "Stopped";
    statusEl.className = "stopped";
  }
}

// ⏳ Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  checkESPConnection();
  setInterval(checkESPConnection, 2000);

  drawMap();
  setInterval(drawMap, 5000);

  const dropdownButton = document.querySelector(".dropdown-button");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdownButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownContent?.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    dropdownContent?.classList.remove("show");
  });
});
