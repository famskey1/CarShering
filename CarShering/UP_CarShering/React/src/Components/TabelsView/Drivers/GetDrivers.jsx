import { useEffect, useState } from "react"
import ButtonsY from '../../ButtonsY'
import { useNavigate } from "react-router-dom";

export default function GetDrivers(){
    const [loading, Setloading] = useState(false);
    const [drivers, SetEmplo] = useState([]);
    const navigate = useNavigate();

    async function FetchEmplos() {
        Setloading(true);
        const responce = await fetch("https://localhost:7040/drivers");
        const driver = await responce.json();
        SetEmplo(driver);
        Setloading(false);
    } 
    useEffect(() => {FetchEmplos()}, [])
    return(
            <div className="container">
            <h1>Водители</h1>
                <div className="inputs">
                <ButtonsY onClick={() => {navigate("/post_drivers")}}>Создать</ButtonsY>
                <ButtonsY onClick={() => {navigate("/put_drivers")}}>Редактировать</ButtonsY>
                <ButtonsY onClick={() => {navigate("/del_drivers")}}>Удалить</ButtonsY>
                </div>
            <>ID водителя | Имя водителя | Фамилия водителя | Отчество водителя | Логин | Пароль | Номер банковской карты | CVV/CVC код</>
            <div className="items">
{loading && <p>Loading...</p>}
{!loading && <ul>{drivers.map(driver => <li key ={driver.id_driver}> 
    <span>{driver.id_driver}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{driver.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{driver.surname}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{driver.secondname}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{driver.login}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{driver.password}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{driver.num_bank_card}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{driver.cvc}</span></li>)}</ul>}
            </div>
            </div>
   )
}