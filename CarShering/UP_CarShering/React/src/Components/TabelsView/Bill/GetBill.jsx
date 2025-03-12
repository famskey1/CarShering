import { useEffect, useState } from "react"
import ButtonsY from '../../ButtonsY'
import { useNavigate } from "react-router-dom";
import moment from "moment";
import 'moment/locale/ru';

export default function GetEmployees(){
    const [loading, Setloading] = useState(false);
    const [bills, SetEmplo] = useState([]);
    const navigate = useNavigate();

    async function FetchEmplos() {
        Setloading(true);
        const responce = await fetch("https://localhost:7040/bill");
        const bill = await responce.json();
        SetEmplo(bill);
        Setloading(false);
    }
    useEffect(() => {FetchEmplos()}, [])
    return(
        <div className="container">
            <h1>Чеки</h1>
                <div className="inputs">
                <ButtonsY onClick={() => {navigate("/post_bill")}}>Создать</ButtonsY>
                <ButtonsY onClick={() => {navigate("/put_bill")}}>Редактировать</ButtonsY>
                <ButtonsY onClick={() => {navigate("/del_bill")}}>Удалить</ButtonsY>
                </div>
            <>ID чека | ID сотрудника | ID водителя | ID транспорта | Дата начала взятия в аренду | Дата окончания | Конечная стоимость</>
            <div className='inputs'>
{loading && <p>Loading...</p>}
{!loading && <ul>{bills.map(bill => <li key ={bills.id_bill}> 
    <span>{bill.id_bill}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{bill.id_emplo}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{bill.id_driver}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{bill.id_tran}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{moment(bill.data_time_start).format('DD.MM.YYYY hh:ss a')}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{moment(bill.data_time_end).format('DD.MM.YYYY hh:ss a')}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{bill.cost_end}</span>
    </li>)}</ul>}
            </div>
        </div>
   )
}