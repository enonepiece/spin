/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
const titlebtn = document.getElementById("title");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: "" },
  { minDegree: 31, maxDegree: 60, value: "" },
  { minDegree: 0, maxDegree: 30, value: "" },
  { minDegree: 331, maxDegree: 360, value: "" },
  { minDegree: 301, maxDegree: 330, value: "" },
  { minDegree: 271, maxDegree: 300, value: "" },
  { minDegree: 241, maxDegree: 270, value: "" },
  { minDegree: 211, maxDegree: 240, value: "" },
  { minDegree: 181, maxDegree: 210, value: "" },
  { minDegree: 151, maxDegree: 180, value: "" },
  { minDegree: 121, maxDegree: 150, value: "" },
  { minDegree: 91, maxDegree: 120, value: "" },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#0085c3",
  "#7ab800",
  "#f2af00",
  "#dc5034",
  "#ce1126",
  "#b7295a",
  "#6e2585",
  "#71c6c1",
  "#5482ab",
  "#009bbb",
  "#444444",
  "#c0c0c0",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
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
        font: { size: 14 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for(let i = 0; i <12; i++){
    if(spinValues[i].value=="")
      spinValues[i].value=document.getElementById("value"+(i+1).toString()).value;
  }
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
/*titlebtn.addEventListener('click', () =>{
  for(let i = 0; i <12; i++){
    spinValues[i].value="";
    console.log(spinValues[i].value);
  }
});*/
/* --------------- End Spin Wheel  --------------------- */
