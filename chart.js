
// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const width = 800;
const height = 600;
const m = 58;    // number of samples per layer
const n = 35;    // number of layers
const k = 8;    // bumps per layer

const x = d3.scaleLinear().domain([0, m - 1]).range([0, width]);
const y = d3.scaleLinear().range([height, 0]);
const z = d3.interpolateCool;
console.log(x)
const area = d3.area()
.x((d, i) => x(i))
.y0(d => y(d[0]))
.y1(d => y(d[1]));

const offset = d3.stackOffsetWiggle; // or try .stackOffsetExpand or .stackOffsetSilhouette
const stack = d3.stack()
.keys(d3.range(n))
.offset(offset)
.order(d3.stackOrderNone);

function bumps(n, m) {
const a = [];
for (let i = 0; i < n; ++i) a[i] = 0;
for (let j = 0; j < m; ++j) bump(a, n);
return a;
}

function bump(a, n) {
const x = 1 / (0.1 + Math.random());
const y = 2 * Math.random() - 0.5;
const z = 10 / (0.1 + Math.random());
for (let i = 0; i < n; ++i) {
const w = (i / n - y) * z;
a[i] += x * Math.exp(-w * w);
}
}

//function randomize() {
//const layers = stack(d3.transpose(Array.from({length: n}, () => bumps(m, k))));
//y.domain([
//d3.min(layers, l => d3.min(l, d => d[0])),
//d3.max(layers, l => d3.max(l, d => d[1]))
//]);
//return layers;
//}
//
//

function randomize() {
  const raw = d3.transpose(
    Array.from({ length: n }, () => {
      const series = bumps(m, k);
      //series[0] = 0; // Force the leftmost x (index 0) to be 0
console.log('prev');
console.log(series);
      for (let i = 0; i < series.length;++i) {
//console.log((i**2/series.length**2)*series[i]);
      //series[i] =(i**2/series.length**2)*series[i]; // Force the leftmost x (index 0) to be 0
      //series[i] =(i/series.length)*series[i]; // Force the leftmost x (index 0) to be 0
      series[i] =(1-(i**0.5/series.length**0.5))*series[i]; // Force the leftmost x (index 0) to be 0
      };
console.log('post');
console.log(series);

      return series;
    })
  );

  const layers = stack(raw);

  y.domain([
    d3.min(layers, l => d3.min(l, d => d[0])),
    d3.max(layers, l => d3.max(l, d => d[1]))
  ]);

  return layers;
}
const svg = d3.create("svg")
.attr("viewBox", [0, 0, width, height])
.attr("width", width)
.attr("height", height)
.attr("style", "max-width: 100%; height: auto;");

document.getElementById("chart").appendChild(svg.node());

//const path = svg.selectAll("path")
//  .data(randomize())
//  .join("path")
//    .attr("d", area)
//    .attr("fill", (d, i) => z(i / n))
//    .attr("stroke", "none")
//    .attr("fill-opacity", 1)
//    .on("mouseover", function (event, d) {
//      d3.select(this)
//        .attr("stroke", "black")
//        .attr("stroke-width", 1.5)
//        .attr("fill-opacity", 1);
//
//      // optionally bring this path to front:
//      this.parentNode.appendChild(this);
//    })
//    .on("mouseout", function (event, d) {
//      d3.select(this)
//        .attr("stroke", "none")
//        .attr("fill-opacity", 1);
//    });



//const path = svg.selectAll("path")
//.data(randomize())
//.join("path")
//.attr("d", area)
//.attr("fill", () => z(Math.random()));
//
//async function animate() {
//while (true) {
//await path
//  .data(randomize())
//  .transition()
//    .delay(10000000)
//    .duration(1500)
//    .attr("d", area)
//  .end();
//}
//}
//
//animate();
const path = svg.selectAll("path")
.data(randomize())
.join("path")
.attr("d", area)
.attr("fill", () => z(Math.random()));
function animateOnce() {
  path
    .data(randomize())
    .transition()
      .duration(1000)
      .attr("d", area);
}
// document.getElementById("hover-target").addEventListener("mouseenter", animateOnce);
document.getElementById("fname").addEventListener("mousedown", animateOnce);
document.getElementById("lname").addEventListener("mousedown", animateOnce);

