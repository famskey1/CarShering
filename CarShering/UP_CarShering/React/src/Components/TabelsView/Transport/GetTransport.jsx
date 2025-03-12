import { useEffect, useState } from "react"
import ButtonsY from '../../ButtonsY'
import { useNavigate } from "react-router-dom";

export default function GetTransport(){
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
            <h1>Транспорт</h1>
            <div className = "inputs">
                <ButtonsY onClick={() => {navigate("/post_tran")}}>Создать</ButtonsY>
                <ButtonsY onClick={() => {navigate("/put_tran")}}>Редактировать</ButtonsY>
                <ButtonsY onClick={() => {navigate("/del_tran")}}>Удалить</ButtonsY>
            </div>
            <>ID транспорта | Тип машины | Марка | Модель | Стоимость за 1 час | Статус</>
            <div className= "inputs">
{loading && <p>Loading...</p>}
{!loading && <ul>{transport.map(tran => <li key ={tran.id_tran}>
    <span>{tran.id_tran}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{tran.type_tran}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{tran.mark}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{tran.model}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{tran.cost}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{tran.status}</span>
     </li>)}</ul>}
            </div>
            </div>
   )
}