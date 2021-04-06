import React, { Component } from 'react'
// import ReactDOM from 'react-dom'

import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

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
      chartData: props.chart,
    }
  }

  render() {
    return (
      <ReactFusioncharts
        {...this.state.chartConfig}
        dataSource={this.state.chartData}
      />
    )
  }
}
