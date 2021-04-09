import React, { Component } from 'react'
// import ReactDOM from 'react-dom'

import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

import './chart.scss'

ReactFC.fcRoot(FusionCharts, charts, FusionTheme)

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
    }
  }

  render() {
    return (
      <div className="chart">
        <ReactFC
          {...this.state.chartConfig}
          dataSource={{
            ...this.props.chartSettings,
            data: this.props.chartData,
          }}
        />
      </div>
    )
  }
}
