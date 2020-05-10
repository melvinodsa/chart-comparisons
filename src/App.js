import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Plotly from "plotly.js";
import Highcharts, { charts } from "highcharts";
import _ from "lodash";

// import createPlotlyComponent from "react-plotly.js/factory";
// const Plot = createPlotlyComponent(Plotly);

am4core.useTheme(am4themes_animated);

const data = [
  {
    strike: 8800,
    call_oi: 10050,
    put_oi: 800000,
  },
  {
    strike: 8850,
    call_oi: 1050,
    put_oi: 38250,
  },
  {
    strike: 8900,
    call_oi: 8700,
    put_oi: 600000,
  },
  {
    strike: 8950,
    call_oi: 525,
    put_oi: 62250,
  },
  {
    strike: 9000,
    call_oi: 76425,
    put_oi: 1200000,
  },
  {
    strike: 9050,
    call_oi: 4200,
    put_oi: 46275,
  },
  {
    strike: 9100,
    call_oi: 90375,
    put_oi: 500000,
  },
  {
    strike: 9150,
    call_oi: 11850,
    put_oi: 53775,
  },
  {
    strike: 9200,
    call_oi: 600000,
    put_oi: 700000,
  },
  {
    strike: 9250,
    call_oi: 72825,
    put_oi: 70350,
  },
  {
    strike: 9300,
    call_oi: 700000,
    put_oi: 500000,
  },
  {
    strike: 9350,
    call_oi: 200000,
    put_oi: 42600,
  },
  {
    strike: 9400,
    call_oi: 1100000,
    put_oi: 200000,
  },
  {
    strike: 9450,
    call_oi: 83100,
    put_oi: 5700,
  },
  {
    strike: 9500,
    call_oi: 1700000,
    put_oi: 400000,
  },
  {
    strike: 9550,
    call_oi: 54450,
    put_oi: 1650,
  },
  {
    strike: 9600,
    call_oi: 600000,
    put_oi: 20850,
  },
  {
    strike: 9650,
    call_oi: 78675,
    put_oi: 75,
  },
  {
    strike: 9700,
    call_oi: 800000,
    put_oi: 24075,
  },
  {
    strike: 9750,
    call_oi: 83775,
    put_oi: 42600,
  },
];

const callOI = _.map(data, (item) => item.call_oi);
const putOI = _.map(data, (item) => item.put_oi);
const strikes = _.map(data, (item) => item.strike);
const callColor = "#0fd190";
const putColor = "#ff3f38";

function createAmCharts() {
  let chart = am4core.create("amchart", am4charts.XYChart);

  chart.data = JSON.parse(JSON.stringify(data));

  let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "strike";
  categoryAxis.title.text = "Strikes";
  chart.yAxes.push(new am4charts.ValueAxis());
  chart.colors.list = [am4core.color(callColor), am4core.color(putColor)];
  createSeries(chart, "call_oi", "Call OI");
  createSeries(chart, "put_oi", "Put OI");
  chart.legend = new am4charts.Legend();
  chart.legend.position = "bottom";

  var title = chart.titles.create();
  title.text = "AM Charts";

  return chart;
}

function createPlotly() {
  const plotlyData = [
    {
      type: "bar",
      x: strikes,
      y: callOI,
      name: "Call OI",
    },
    {
      type: "bar",
      x: strikes,
      y: putOI,
      name: "Put OI",
    },
  ];

  const plotlyOldData = [
    {
      type: "bar",
      x: strikes,
      y: _.map(data, (item) => 0),
      name: "Call OI",
    },
    {
      type: "bar",
      x: strikes,
      y: _.map(data, (item) => 0),
      name: "Put OI",
    },
  ];

  const yMaxs = [
    _.chain(data)
      .map((d) => d.call_oi)
      .max()
      .value(),
    _.chain(data)
      .map((d) => d.put_oi)
      .max()
      .value(),
  ];
  const yMax = yMaxs[0] > yMaxs[1] ? yMaxs[0] : yMaxs[1];
  const yMins = [
    _.chain(data)
      .map((d) => d.call_oi)
      .min()
      .value() / 3,
    _.chain(data)
      .map((d) => d.put_oi)
      .min()
      .value() / 3,
  ];
  const yMin = yMins[0] > yMins[1] ? yMins[1] : yMins[0];
  const range = [yMin, yMax];

  const layout = {
    width: document.body.offsetWidth,
    height: 350,
    title: "Plotly",
    colorway: [callColor, putColor],
    yaxis: {
      autorange: false,
      fixedrange: true,
      range,
    },
    xaxis: {
      tickformat: ":.3s",
      title: {
        text: "Strikes",
        standoff: 40,
      },
    },
    legend: { orientation: "h", x: 0.45 },
  };

  Plotly.newPlot("plotly", plotlyOldData, layout);
  Plotly.animate(
    "plotly",
    {
      data: plotlyData,
      layout: {},
    },
    {
      transition: {
        duration: 2000,
        easing: "cubic-in-out",
      },
      frame: {
        duration: 2000,
      },
    }
  );
}

function createHighCharts() {
  Highcharts.chart("highcharts", {
    chart: {
      type: "column",
    },
    title: {
      text: "High Charts",
    },
    xAxis: {
      categories: strikes,
      crosshair: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Call OI",
        data: callOI,
        color: callColor,
      },
      {
        name: "Put OI",
        data: putOI,
        color: putColor,
      },
    ],
  });
}

class App extends Component {
  componentDidMount() {
    this.amchart = createAmCharts();
    this.plotly = createPlotly();
    this.highcharts = createHighCharts();
  }

  componentWillUnmount() {
    if (this.amchart) {
      this.amchart.dispose();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="amchart"></div>
        <div id="plotly"></div>
        <div id="highcharts"></div>
      </React.Fragment>
    );
  }
}

function createSeries(chart, field, name) {
  let series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = field;
  series.dataFields.categoryX = "strike";
  series.name = name;
  series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
  series.columns.template.height = am4core.percent(100);
  series.sequencedInterpolation = true;

  let valueLabel = series.bullets.push(new am4charts.LabelBullet());
  valueLabel.label.text = "{valueX}";
  valueLabel.label.horizontalCenter = "left";
  valueLabel.label.dy = 10;
  valueLabel.label.hideOversized = false;
  valueLabel.label.truncate = false;
}

export default App;
