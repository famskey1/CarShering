import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import AppAdmin from './AppAdmin.jsx'
import AppEmplo from './AppEmplo.jsx'
import TransportSel from './TransportSel.jsx'
import BillCreate from './BillCreate.jsx'

import PostTransport from './Components/TabelsView/Transport/PostTransport.jsx'
import PutTransport from './Components/TabelsView/Transport/PutTransport.jsx'
import DeleteTransport from './Components/TabelsView/Transport/DeleteTransport.jsx'

import PostEmployees from './Components/TabelsView/Employees/PostEmployees.jsx'
import PutEmployees from './Components/TabelsView/Employees/PutEmployees.jsx'
import DeleteEmployees from './Components/TabelsView/Employees/DeleteEmployees.jsx'

import PostDrivers from './Components/TabelsView/Drivers/PostDrivers.jsx'
import PutDrivers from './Components/TabelsView/Drivers/PutDrivers.jsx'
import DeleteDrivers from './Components/TabelsView/Drivers/DeleteDrivers.jsx'

import PostBill from './Components/TabelsView/Bill/PostBill.jsx'
import PutBill from './Components/TabelsView/Bill/PutBill.jsx'
import DeleteBill from './Components/TabelsView/Bill/DeleteBill.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <App />
},
{
  path: "/adminpanel",
  element: <AppAdmin />
},
{
  path: "/emplopanel",
  element: <AppEmplo />
},
{
  path: "/transport_select",
  element: <TransportSel />
},
{
  path: "/transport_select/bill_create",
  element: <BillCreate />
},
{
  path: "/post_tran",
  element: <PostTransport />
},
{
  path: "/put_tran",
  element: <PutTransport />
},
{
  path: "/del_tran",
  element: <DeleteTransport />
},
{
  path: "/post_emplo",
  element: <PostEmployees />
},
{
  path: "/put_emplo",
  element: <PutEmployees />
},
{
  path: "/del_emplo",
  element: <DeleteEmployees />
},
{
  path: "/post_drivers",
  element: <PostDrivers />
},
{
  path: "/put_drivers",
  element: <PutDrivers />
},
{
  path: "/del_drivers",
  element: <DeleteDrivers />
},
{
  path: "/post_bill",
  element: <PostBill />
},
{
  path: "/put_bill",
  element: <PutBill />
},
{
  path: "/del_bill",
  element: <DeleteBill />
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
