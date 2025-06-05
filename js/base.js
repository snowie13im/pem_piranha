document.addEventListener("DOMContentLoaded"), () => {
  setInterval(fetchBatteryData, 2000);
    function updateBattery(id, value) {
    const bar = document.getElementById(id);
    const label = document.getElementById(id + "-label");

    bar.style.setProperty("--level", value + "%");
    bar.querySelector("::after"); // technically, you'd need to manually style it instead

    bar.innerHTML = ""; // reset
    const fill = document.createElement("div");
    fill.style.width = value + "%";
    fill.style.height = "100%";
    fill.style.backgroundColor = value < 20 ? "red" : "limegreen";
    bar.appendChild(fill);

    label.textContent = value + "%";
    }

    function fetchBatteryData() {
    fetch("http://192.168.1.50/robot-battery")
        .then(res => res.text())
        .then(val => updateBattery("robot-battery", parseInt(val)))
        .catch(err => console.warn("Robot battery error", err));

    fetch("http://192.168.1.50/base-battery")
        .then(res => res.text())
        .then(val => updateBattery("base-battery", parseInt(val)))
        .catch(err => console.warn("Base battery error", err));
    }

    setInterval(fetchBatteryData, 2000);

    function fetchBatteryData() {
    updateBattery("robot-battery", Math.floor(Math.random() * 100));
    updateBattery("base-battery", Math.floor(Math.random() * 100));
    }
}