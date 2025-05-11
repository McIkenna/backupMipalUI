import React from 'react'
import { LineChartReport } from './graphs/LineChartReport'
import { BarchartReport } from './graphs/BarchartReport'
import { BubbleChartReport } from './graphs/BubbleChartReport'
import {Grid} from '@mui/material'

export const AnalyticPage = () => {
  return (
    <div>
        <h1>AnalyticPage</h1>
        <Grid container spacing={2}>
            <Grid  size={6}>
                <BarchartReport />
            </Grid>
            <Grid size={6}>
                <LineChartReport />
            </Grid>
            <Grid size={12}>
                <BubbleChartReport />
            </Grid>
            </Grid> 
    </div>
  )
}
