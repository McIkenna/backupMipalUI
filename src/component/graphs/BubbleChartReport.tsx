import React, { useMemo } from 'react'
import { useBuyerTrendStore } from '../../service/useBuyerTrendStore'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, LabelList, Cell, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import {Typography} from '@mui/material';
export const BubbleChartReport = () => {
    const { buyerTrend } = useBuyerTrendStore(state => state)
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
                        scaled_weight_x: 0.001 * Math.random(),
                        scaled_weight_y: 0.001 * Math.random(),
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

// const renderTooltip = (props: any) => {
//     const { active, payload } = props;

//     if (active && payload && payload.length) {
//       const data = payload[0] && payload[0].payload;

//       return (
//         <div
//           style={{
//             backgroundColor: "#fff",
//             border: "1px solid #999",
//             margin: 0,
//             padding: 10,
//           }}
//         >
//           <p>{data.hour}</p>
//           <p>
//             <span>value: </span>
//             {data.z}
//           </p>
//         </div>
//       );
//     }

//     return null;
//   };
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const domain = parseDomain();
const range = [100, 5000];

return (
    <div style={{ width: '100%' }}>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
                   Sales Analytics Dashboard
                  </Typography>

        <ResponsiveContainer width={1200} height={800}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid />
                <XAxis type="number" dataKey="scaled_weight_x" name="stature"/>
                <YAxis type="number" dataKey="scaled_weight_y" name="weight" />
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
    </div>
);
    
}
