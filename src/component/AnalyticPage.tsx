import React from 'react'
import { LineChartReport } from './graphs/LineChartReport'
import { BarchartReport } from './graphs/BarchartReport'
import { BubbleChartReport } from './graphs/BubbleChartReport'

export const AnalyticPage = () => {
  return (
    <div>
        <h1>AnalyticPage</h1>
        <BubbleChartReport />
        {/* <BarchartReport />
        <LineChartReport /> */}
        {/* <SalesRecords /> */}
        {/* <Trends /> */}
        {/* <PredictiveRecords /> */}
        {/* <SalesRecords /> */}
        {/* <Trends /> */}
        {/* <PredictiveRecords /> */}
    </div>
  )
}
