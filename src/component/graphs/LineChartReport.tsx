import React, { useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UseSalesRecordStore } from '../../service/UseSalesRecordStore';
import { Select, Box, InputLabel, MenuItem, FormControl, Typography } from '@mui/material';


export const LineChartReport = () => {
  const { salesRecord } = UseSalesRecordStore(state => state)


  
  // const rowData = useMemo(() =>{
  //         if (!salesRecord || !salesRecord.data) {
  //             return []
  //         }
  //         const columns = salesRecord?.data?.map((item: any) => {
  //             return {
  //                 date: item.sale_date,
  //                 // total: item.total,
  //                 quantity: item.quantity_sold,
  //                 name: item.product_name,
  //             }
  //         })
  //         return columns

  //     }, [salesRecord])
  //   const rowData = useMemo(() => {
  //     if (!salesRecord || !salesRecord.data) {
  //         return [];
  //     }

  //     const groupedData = salesRecord.data.reduce((acc: any, item: any) => {
  //         const existingProduct = acc.find((entry: any) => entry.name === item.product_name);
  //         if (existingProduct) {
  //             existingProduct.quantity += item.quantity_sold;
  //         } else {
  //             acc.push({
  //                 date: item.sale_date, // You can adjust this if grouping by date is needed
  //                 quantity: item.quantity_sold,
  //                 name: item.product_name,
  //             });
  //         }
  //         return acc;
  //     }, []);

  //     return groupedData;
  // }, [salesRecord]);
 
  const handleChange = (event: any) => {
    setSelectedProduct(event.target.value);
  };
  const rowData = useMemo(() => {
    if (!salesRecord || !salesRecord.data) {
      return [];
    }

    const groupedData = salesRecord.data.reduce((acc: any, item: any) => {
      if (!acc[item.product_name]) {
      acc[item.product_name] = [];
      }
      acc[item.product_name].push({
      date: item.sale_date,
      quantity: item.quantity_sold,
      });
      return acc;
    }, {});

    Object.keys(groupedData).forEach((productName) => {
      groupedData[productName].sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });

    return groupedData;
  }, [salesRecord]);

  const [selectedProduct, setSelectedProduct] = useState(Object.keys(rowData)[0]);
  // console.log('rowData from LineChartReport -->', rowData[selectedProduct]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Product</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={selectedProduct}
            label="Product"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              Object.keys(rowData).map((productName) => (
                <MenuItem key={productName} value={productName}>
                  {productName}
                </MenuItem>
              ))
            }
          </Select>

        </FormControl>
        
      </Box>
        <Box>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
           Sales Analytics Dashboard
          </Typography>
          <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
            {selectedProduct} Sales Report
          </Typography>
        <ResponsiveContainer width={600} height={400}>
          <LineChart
            width={500}
            height={300}
            data={rowData[selectedProduct]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="quantity" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
            {/* <Line type="monotone" dataKey="name" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
