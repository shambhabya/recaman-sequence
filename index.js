const scale = 10; // 0->1 = 10px

const canvas = document.querySelector("#canvas");
const rangeInput = document.querySelector("#rangeInput");
const rangeValueDiv = document.querySelector("#rangeValue");

const ctx = canvas.getContext("2d");

const sequence = [
  0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62, 42,
  63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114, 77, 39, 78,
  38, 79, 37, 80, 36, 81, 35, 82, 34, 83, 33, 84, 32, 85, 31, 86, 30, 87, 29,
  88, 28, 89, 27, 90, 26, 91,
].map((item) => item * scale);

const drawRecaman = (n) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "black";

  const midHeight = canvas.height / 2;

  // Draw the middle line
  ctx.beginPath();
  ctx.moveTo(0, midHeight);
  ctx.lineTo(canvas.width, midHeight);
  ctx.strokeStyle = "black";
  ctx.stroke();

  // Draw the Recamán sequence arcs with gradient colors
  for (let i = 1; i <= n; i++) {
    const x = sequence[i - 1];
    const y = sequence[i];
    const radius = Math.abs(sequence[i] - sequence[i - 1]) / 2;
    const startAngle = i % 2 ? 0 : Math.PI;
    const endAngle = startAngle + Math.PI;

    // Create a gradient for each arc
    const gradient = ctx.createLinearGradient(x, midHeight, y, midHeight);
    gradient.addColorStop(0, `hsl(${(i * 20) % 360}, 100%, 50%)`);
    gradient.addColorStop(1, `hsl(${((i + 1) * 20) % 360}, 100%, 50%)`);

    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.arc((x + y) / 2, midHeight, radius, startAngle, endAngle);
    ctx.stroke();
  }
};

const onInputChangeHandler = (value) => {
  value = parseInt(value);
  rangeValueDiv.innerText = value;
  drawRecaman(value);
};

drawRecaman(parseInt(rangeInput.value));

rangeInput.addEventListener("input", (e) => {
  onInputChangeHandler(e.target.value);
});

console.log(sequence.length);
