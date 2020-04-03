import React from "react";
import ReactEcharts from "echarts-for-react";
import { mnemonics } from "./mnemonics";
import { Card } from "../../layout/card/card";
import { Constants } from "../../../config/globals";

export const EMBED_COUNTIES_TABLE = "counties";

export class CountiesCard extends React.PureComponent {
  getChartOptions() {
    const data = this.props.state.counties.map(countie => {
      return {
        name: mnemonics[countie.name],
        value: countie.value
      };
    });
    return {
      tooltip: {
        trigger: "item"
      },
      visualMap: {
        show: false,
        min: 0,
        max: this.props.state.max,
        left: "left",
        top: "bottom",
        text: ["Ridicat", "Scazut"],
        calculable: true,
        inRange: {
          color: [Constants.countyLowestColor, Constants.countyHighestColor]
        }
      },
      series: [
        {
          name: "Cazuri",
          type: "map",
          mapType: "RO",
          itemStyle: {
            areaColor: Constants.curedColor
          },
          label: {
            normal: {
              show: false
            }
          },
          data
        }
      ]
    };
  }

  render() {
    const state = this.props.state;
    const { isLoaded, error, topCounties, isStale } = state;

    const topLines =
      topCounties &&
      topCounties.map(county => (
        <tr key={county.name}>
          <td>{county.name}</td>
          <td className="has-text-right">{county.value}</td>
        </tr>
      ));

    return (
      <Card
        error={error}
        isLoaded={isLoaded}
        title="Cazuri confirmate pe judete"
        isStale={isStale}
        embedPath={EMBED_COUNTIES_TABLE}
      >
        {topCounties && (
          <ReactEcharts
            option={this.getChartOptions()}
            style={{ height: "260px", width: "100%", top: "-5%" }}
            className="react_for_echarts"
          />
        )}
        <table className="table">
          <tbody>{topLines}</tbody>
        </table>
      </Card>
    );
  }
}
