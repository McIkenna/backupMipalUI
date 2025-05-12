import React, { useMemo } from 'react'
import { useBuyerTrendStore } from '../../service/useBuyerTrendStore'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, LabelList, Cell, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import {Typography, Box} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
export const BubbleChartReport = () => {
    const { buyerTrend, loading} = useBuyerTrendStore(state => state)
    // console.log('buyerTrend from BubbleChartReport -->', buyerTrend)


    const data1 = useMemo(() => {
        if (!buyerTrend || !buyerTrend.data) {
            return []
        }
        const result: { term_desc: string; term_weight: number; scaled_weight_x: number; scaled_weight_y: number, scaled_weight_z: number }[] = [];

        for (const topicId in buyerTrend?.data?.termweights) {
            const weights = buyerTrend?.data?.termweights[topicId];
            const descs = buyerTrend?.data?.topic_desc[topicId];

            if (weights && descs && weights.length === descs.length) {
                for (let i = 0; i < weights.length; i++) {
                    result.push({
                        term_desc: descs[i],
                        term_weight: weights[i],
                        scaled_weight_x: 0.002 * Math.random(),
                        scaled_weight_y: 0.002 * Math.random(),
                        scaled_weight_z: weights[i],

                    });
                }
            }
        }

        return result;
    
}, [buyerTrend])

// console.log('data1 from BubbleChartReport -->', data1)


const parseDomain = () => [
    0,
    Math.max(
        Math.max.apply(
            null,
            data1.map((entry) => entry.scaled_weight_z ),
        )
    ),
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const domain = parseDomain();
const range = [100, 5000];

return (
    <div style={{ width: '100%' }}>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
                   Sales Analytics Dashboard
                  </Typography>

{loading || data1?.length === 0 ?<Box>
                      <CircularProgress size="3rem"/>
                  </Box>
                    :
                    <Box>
        <ResponsiveContainer width={650} height={800}>
            <ScatterChart
                margin={{
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }}
            >
                <CartesianGrid />
                <XAxis type="number" dataKey="scaled_weight_x" name="scaled_weight_x" />
                <YAxis type="number" dataKey="scaled_weight_y" name="scaled_weight_y" />
                {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
                {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} /> */}
                <ZAxis type="number" dataKey="scaled_weight_z" domain={domain}  range={range}/>

                <Scatter name="A school" data={data1} fill="#8884d8">
                {data1.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
                    <LabelList dataKey="term_desc" fill='black'/>
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
        </Box>
        }
    </div>
);
    
}
