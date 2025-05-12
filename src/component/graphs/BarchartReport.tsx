import React, {useMemo} from 'react'
import { useTopSellProdStore } from '../../service/useTopSellProdStore'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
export const BarchartReport = () => {
    const {topSellProd, loading} = useTopSellProdStore(state => state)
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
        {loading || rowData?.length === 0 ?<Box>
                              <CircularProgress size="3rem"/>
                          </Box>
                            :
                            <Box>
    <ResponsiveContainer width={600} height={400}>
        <BarChart
          width={500}
          height={300}
          data={rowData}
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
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" activeBar={<Rectangle fill="gold" stroke="blue" />} />
          {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
        </BarChart>
      </ResponsiveContainer>
      </Box>
        }
      </Box>
  )
}
