import TabsEmplo from './TabsEmplo'
import HeaderAdm from './Components/HeaderAdm'
import Footer from './Components/Footer'
import GetDrivers from './Components/TabelsView/Drivers/GetDrivers'
import GetBill from './Components/TabelsView/Bill/GetBill'
import GetTransport from './Components/TabelsView/Transport/GetTransport'
import Carfon from './Components/Carfon'
import { useState } from 'react'

export default function AppEmplo(){
    const [tab, setTab] = useState('drivers', 'tran', 'bill')
    return(
        <>
        <HeaderAdm/>
        <Carfon>Таблицы</Carfon>
            <TabsEmplo active = {tab} onChange = {(current) => setTab(current)}/>
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