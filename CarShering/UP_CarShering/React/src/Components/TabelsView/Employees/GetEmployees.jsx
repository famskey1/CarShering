import { useEffect, useState } from "react"
import ButtonsY from '../../ButtonsY'
import { useNavigate } from "react-router-dom";

export default function GetEmployees(){
    const [loading, Setloading] = useState(false);
    const [employees, SetEmplo] = useState([]);
    const navigate = useNavigate();

    async function FetchEmplos() {
        Setloading(true);
        const responce = await fetch("https://localhost:7040/employees");
        const emplo = await responce.json();
        SetEmplo(emplo);
        Setloading(false);
    } 
    useEffect(() => {FetchEmplos()}, [])
    return(
        <div className="container">
            <h1>Сотрудники</h1>
                <div className="inputs">
                <ButtonsY onClick={() => {navigate("/post_emplo")}}>Создать</ButtonsY>
                <ButtonsY onClick={() => {navigate("/put_emplo")}}>Редактировать</ButtonsY>
                <ButtonsY onClick={() => {navigate("/del_emplo")}}>Удалить</ButtonsY>
                </div>
            <div>ID сотрудника | Имя | Фамилия | Отчество | Логин | Пароль | Должность</div>
            <div className='inputs'>
{loading && <p>Loading...</p>}
{!loading && <ul>{employees.map(emplo => <li key ={employees.id_emplo}> 
    <span>{emplo.id_emplo}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{emplo.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{emplo.surname}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{emplo.secondname}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{emplo.login}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{emplo.password}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{emplo.position}</span></li>)}</ul>}
            </div>
            </div>
   )
}