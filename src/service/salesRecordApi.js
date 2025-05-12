import React from 'react'

export const salesRecordApi = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/sales_records');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        return ({ data, loading: false });
        // console.log('data:', data);
      } catch (err) {
        return({ error: err.message, loading: false });
      }
}


export const topSellingProdApi = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/top_selling_products');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        return ({ data, loading: false });
        // console.log('data:', data);
      } catch (err) {
        return({ error: err.message, loading: false });
      }
}

export const buyerTendApi = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/buyer_trends');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        return ({ data, loading: false });
        // console.log('data:', data);
      } catch (err) {
        return({ error: err.message, loading: false });
      }
}


export const salePredictApi = async () => {
  try {
      const response = await fetch('http://127.0.0.1:8000/predict_sales_per_product');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      return ({ data, loading: false });
      // console.log('data:', data);
    } catch (err) {
      return({ error: err.message, loading: false });
    }
}