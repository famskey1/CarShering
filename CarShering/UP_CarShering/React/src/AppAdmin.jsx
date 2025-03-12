import './App.css'
import HeaderAdm from './Components/HeaderAdm'
import TabsAdmin from './TabsAdmin'
import GetEmployees from './Components/TabelsView/Employees/GetEmployees'
import GetDrivers from './Components/TabelsView/Drivers/GetDrivers'
import GetBill from './Components/TabelsView/Bill/GetBill'
import GetTransport from './Components/TabelsView/Transport/GetTransport'
import Carfon from './Components/Carfon'
import Footer from './Components/Footer'
import { useState } from 'react'

export default function AppAdmin(){
    const [tab, setTab] = useState('emplo', 'drivers', 'tran', 'bill')
    
    return(
        <>
        <HeaderAdm/>
        <Carfon>Таблицы</Carfon>
        <TabsAdmin active = {tab} onChange = {(current) => setTab(current)}/>
            {tab === 'emplo' &&(
                <GetEmployees/> 
            )}
           {tab === 'drivers' &&(
                <GetDrivers/> 
            )}
            {tab === 'tran' &&(
                <GetTransport/>
            )}
            {tab === 'bill' &&(
                <GetBill/>
            )}
        <Footer/>
        </>
    )
}