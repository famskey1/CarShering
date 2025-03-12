import HeaderAdm from './Components/HeaderAdm';
import Carfon from './Components/Carfon';
import { useEffect, useState } from "react"
import ButtonsY from './Components/ButtonsY'
import { useNavigate } from "react-router-dom";
import Footer
 from './Components/Footer';
export default function TransportSel(){
    const [loading, Setloading] = useState(false);
    const [transport, SetEmplo] = useState([]);
    const navigate = useNavigate();

    async function FetchEmplos() {
        Setloading(true);
        const responce = await fetch("https://localhost:7040/transport");
        const tran = await responce.json();
        SetEmplo(tran);
        Setloading(false);
    } 
    useEffect(() => {FetchEmplos()}, [])

    return(
        <div className="container">
        <HeaderAdm/>
        <Carfon>Каталог транспорта</Carfon>
        <p><h1>Как вы выбрали автомобиль, стоит обратиться в наш в сервисный центр 
для предъявления водительского удостоверения и продолжения брони, 
после чего наш сотрудник выдаст вам желанный автомобиль!</h1></p>
<div className= "inputs">
{loading && <p>Loading...</p>}
{!loading && <div className='contens'>{transport.map(tran => <div className='content' key ={tran.id_tran}>
    <span>Тип машины</span>
    <span>Марка</span>
    <span>Модель</span>
    <span>Стоимость за 1 час</span>
    <span>Статус</span>
    <ButtonsY onClick={() => {navigate("/post_bill")}}>Забронировать</ButtonsY>
    <span>{tran.type_tran}</span>
    <span>{tran.mark}</span>
    <span>{tran.model}</span>
    <span>{tran.cost}</span>
    <span>{tran.status}</span>    
     </div>)}</div>}
            </div>
            <Footer/>
        </div>
    )
}