const mapGrid = {}; // key = "x,y", value = 0 (free) or 1 (obstacle)

function handleDataFromESP(raw) {
  const lines = raw.trim().split('\n');
  lines.forEach(line => {
    const [x, y, type] = line.split(',').map(Number);
    mapGrid[`${x},${y}`] = type;
  });
  drawMap();
}

function drawMap() {
  const canvas = document.getElementById("mapa");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  Object.entries(mapGrid).forEach(([key, type]) => {
    const [x, y] = key.split(',').map(Number);
    if (type === 1) {
      ctx.fillStyle = "black"; // obstacle
    } else if (type === 0) {
      ctx.fillStyle = "lightgreen"; // free space
    }
    ctx.fillRect(x * 5, y * 5, 5, 5);
  });
}



fetch("http://192.168.1.50/map")
  .then(res => res.text())
  .then(data => handleDataFromESP(data));

  

// AUTO FETCH FROM ESP
// setInterval(() => {
//  fetch("http://192.168.1.50/pos")
//    .then(res => res.text())
//    .then(data => handleDataFromESP(data))
//    .catch(err => console.warn("No data from ESP:", err));
// }, 1000); // you can tune the interval

let roboX = 0;
let roboY = 0;
let direction = 1;

setInterval(() => {
  roboX += direction;
  if (roboX > 50 || roboX < 0) {
    direction *= -1;
    roboY += 1;
  }
  drawMap();
}, 100);
