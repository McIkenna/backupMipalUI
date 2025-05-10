import React , {useState, useMemo}from 'react'
import { UseSalesRecordStore } from '../service/UseSalesRecordStore'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community'
import { constants } from 'buffer';
import { Typography } from '@mui/material';
export const TablePage = () => {
    ModuleRegistry.registerModules([AllCommunityModule]);
    const {salesRecord} = UseSalesRecordStore(state =>state)

    const rowDataMemo = useMemo(() => salesRecord.data, [salesRecord])
    const columnDataMemo = useMemo(() =>{
        if (!salesRecord || !salesRecord.data) {
            return []
        }
        const columns = Object.keys(salesRecord?.data[0])?.map((item: any) => {
            return {
                field: item,
                headerName: item,
                width: 150,
                editable: true,
                cellEditor: 'agTextCellEditor',
            }
        })
        return columns

    }, [salesRecord])


  return (
    <div>
        <Typography variant='h4' sx={{marginBottom: 2}}>
            Sales Record
        </Typography>
    <div style={{ height: 600, width: '100%' }}>
    <AgGridReact
        rowData={rowDataMemo}
        columnDefs={columnDataMemo}

    />
</div>
</div>
  )
}
