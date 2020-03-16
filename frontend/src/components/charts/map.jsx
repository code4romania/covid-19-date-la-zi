import React from "react";
import ReactEcharts from "echarts-for-react";
import { Card } from "../layout/card";
import { casesByCounty } from "../../config/by-county-mock-data";

export default class Map extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = this.getInitialState();
  // }
  // timeTicket = null;
  // getInitialState = () => ({ option: this.getOption() });

  // componentDidMount() {
  //   if (this.timeTicket) {
  //     clearInterval(this.timeTicket);
  //   }
  //   this.timeTicket = setInterval(() => {
  //     const option = this.state.option;
  //     const r = new Date().getSeconds();
  //     option.title.text = "iphone销量" + r;
  //     option.series[0].name = "iphone销量" + r;
  //     option.legend.data[0] = "iphone销量" + r;
  //     this.setState({ option: option });
  //   }, 1000);
  // }

  // componentWillUnmount() {
  //   if (this.timeTicket) {
  //     clearInterval(this.timeTicket);
  //   }
  // }

  randomData() {
    return Math.round(Math.random() * 1000);
  }

  getOption = () => {
    return {
      title: {
        text: "Romanica",
        subtext: "Cazuri confirmate pe judete",
        left: "center"
      },
      tooltip: {
        trigger: "item"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["jud", "jud2", "jud3"]
      },
      visualMap: {
        min: 0,
        max: 1000,
        left: "left",
        top: "bottom",
        text: ["oh1", "oh2"],
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'red']
      }
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          dataView: {
            readOnly: true,
            title: "Vezi tabel",
            lang: ["data view", "Inapoi la harta", "refresh"]
          },
          saveAsImage: {
            name: "Harta stats covid Code4romania",
            title: "Salveaza ca imagine"
          }
        }
      },
      series: [
        {
          name: "Cazuri confirmate",
          type: "map",
          mapType: "RO",
          itemStyle: {
            areaColor: "#7EBCFF",
          },
          label: {
            normal: {
              show: true,
              position:'inside',
              formatter: '{b}\n {c}'
            },
            // emphasis: {
            //   show: true
            // }
          },
          data: casesByCounty,
        }
      ]
    };
  };
  render() {
    return (
      <Card title="Cazuri confirmate pe judete">
        <ReactEcharts
          option={this.getOption()}
          style={{ height: "500px", width: "100%" }}
          className="react_for_echarts"
        />
      </Card>
    );
  }
}
