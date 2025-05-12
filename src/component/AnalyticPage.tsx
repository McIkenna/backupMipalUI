import React from 'react'
import { LineChartReport } from './graphs/LineChartReport'
import { BarchartReport } from './graphs/BarchartReport'
import { BubbleChartReport } from './graphs/BubbleChartReport'
import { PredictBarChart } from './graphs/PredictBarChart'
import {Grid} from '@mui/material'

export const AnalyticPage = () => {
  return (
    <div>
        <h1>AnalyticPage</h1>
        <Grid container spacing={3} direction="row"
  sx={{
    justifyContent: "center",
    alignItems: "flex-start",
  }}>
            <Grid size={6}>
                <LineChartReport />
            </Grid>
            <Grid size={6}>
                <BubbleChartReport />
            </Grid>
            <Grid size={6}>
                <PredictBarChart />
            </Grid>
            <Grid  size={6}>
                <BarchartReport />
            </Grid>
            </Grid> 
    </div>
  )
}
