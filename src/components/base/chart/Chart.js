import React, { Component } from 'react'
// import ReactDOM from 'react-dom'

import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

import './chart.scss'

charts(FusionCharts)

export default class Chart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chartConfig: {
        type: props.type,
        width: props.width,
        height: props.height,
        dataFormat: 'json',
      },
      chartData: {
        chart: props.chartSettings,
        data: props.chartData,
      },
    }
  }

  render() {
    return (
      <div className="chart">
        <ReactFusioncharts
          {...this.state.chartConfig}
          dataSource={this.state.chartData}
        />
      </div>
    )
  }
}
