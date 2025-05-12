import React, { useMemo } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import { usePredictSaleStore } from '../../service/usePredictSaleStore';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
    '#00045FE','#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF',
    '#33FFF5', '#F5FF33', '#FF8C33', '#33FF8C', '#8C33FF',
    '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF',
    '#FFFF33', '#FF6633', '#33FF66', '#6633FF', '#FF3366' ,'red', 'pink'];


export const PredictBarChart = () => {

    const { predictSale, loading} = usePredictSaleStore();

    const data1 = useMemo(() => {
        return predictSale?.data?.map((item: any) => ({
            name: item.product_name,
            quantity: item.predicted_quantity,
        }));
    }
    , [predictSale]);

    return (
        <Box>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
                    Predicted Sales By Quantity
        </Typography>
        {
        loading || data1?.length === 0 ? <Box>
            <CircularProgress size="3rem"/>
        </Box>
        :
        <Box>
        <BarChart
            width={650}
            height={800}
            data={data1}
            margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="quantity"/>
            <Tooltip />
            <Bar dataKey="quantity" >
                {data1?.map((entry:any, index:any) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 10]} />
                ))}
            </Bar>
        </BarChart>
       </Box>
       }
        </Box>
    );
}
