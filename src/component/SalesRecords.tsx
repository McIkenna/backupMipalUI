import { useEffect, useState} from 'react'
import { UseSalesRecordStore } from '../service/UseSalesRecordStore'

export const SalesRecords = () => {

    const {salesRecord} = UseSalesRecordStore(state =>state)
    console.log('salesRecord from SalesRecords -->', salesRecord)
    return (
        <div>SalesRecords</div>
    )
}
