import React, {useMemo} from 'react'
import { useTopSellProdStore } from '../../service/useTopSellProdStore'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
export const BarchartReport = () => {
    const {topSellProd} = useTopSellProdStore(state => state)

    console.log('topSellProd from BarchartReport -->', topSellProd)

      const rowData = useMemo(() =>{
          if (!topSellProd || !topSellProd.data) {
              return []
          }
          const columns = topSellProd?.data?.map((item: any) => {
              return {
                  date: item.sale_date,
                  // total: item.total,
                  quantity: item.quantity_sold,
                  name: item.product_name,
              }
          })
          return columns

      }, [topSellProd])

  return (
    <Box>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
                    Top 10 Selling Products
        </Typography>
    <ResponsiveContainer width={600} height={400}>
        <BarChart
          width={500}
          height={300}
          data={rowData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="quantity"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" activeBar={<Rectangle fill="gold" stroke="blue" />} />
          {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
        </BarChart>
      </ResponsiveContainer>
      </Box>
  )
}
