/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: "牛肉麵" },
  { minDegree: 31, maxDegree: 60, value: "炒飯" },
  { minDegree: 0, maxDegree: 30, value: "乞丐時光" },
  { minDegree: 331, maxDegree: 360, value: "滷肉飯" },
  { minDegree: 301, maxDegree: 330, value: "妳" },
  { minDegree: 271, maxDegree: 300, value: "雞腿便當" },
  { minDegree: 241, maxDegree: 270, value: "排骨便當" },
  { minDegree: 211, maxDegree: 240, value: "炒麵" },
  { minDegree: 181, maxDegree: 210, value: "牛排" },
  { minDegree: 151, maxDegree: 180, value: "湯麵" },
  { minDegree: 121, maxDegree: 150, value: "泡麵" },
  { minDegree: 91, maxDegree: 120, value: "水喝到飽" },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",
  "#F1C40F",
  "#b163da",
  "#E74C3C",
  "#7D3C98",
  "#138D75",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ["牛肉麵", "炒飯", "乞丐時光", "滷肉飯", "妳", "雞腿便當", "排骨便當", "炒麵", "牛排", "湯麵", "泡麵", "水喝到飽"],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 13 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>這一餐要吃的是~~ ${i.value} ! </p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>~轉轉轉~</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */