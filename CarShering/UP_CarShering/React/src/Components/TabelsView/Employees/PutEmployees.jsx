import { useNavigate, useParams } from "react-router-dom";
import Buttons from "../../Buttons";
import HeaderAdm from "../../HeaderAdm";
import Footer from '../../Footer';
import Carfon from '../../Carfon';

export default function PutEmployees(){
    
    const navigate = useNavigate();
    async function HandleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const employees = Object.fromEntries(formData.entries());

        if(!employees.id_emplo || !employees.name || !employees.surname || !employees.login || !employees.password || !employees.position){alert("Пожайлуста, заполните все поля!"); return;}

        try{
            const responce = await fetch("https://localhost:7040/employees", 
                {
                method: "PUT", 
                headers:{"Accept": "application/json", "Content-Type": "application/json"},
                body: JSON.stringify({
                    id_emplo: parseInt(employees.id_emplo),
                    name: employees.name,
                    surname: employees.surname,
                    secondname:employees.secondname,
                    login: employees.login,
                    password: employees.password,
                    position: employees.position
                })
            })

            await responce.json();
            if(responce.ok) alert("Успешно!")
                if(responce.status === 400){alert("Ошибка 400 (Bad Request)")}
        } catch(error){
            alert("Проблема с сервером " + error)
        }
    }
    
    return(
        <div className="container">
        <HeaderAdm />
        <Carfon>Редактирование сотрудника</Carfon>
        <form onSubmit={HandleSubmit} className="inputs">
                <input placeholder="ID сотрудника" type="number" name="id_emplo"></input>
                <input placeholder="Имя" type="text" name="name"></input>
                <input placeholder="Фамилия" type="text" name="surname"></input>
                <input placeholder="Отчество(если есть)" type="text" name="secondname"></input>
                <input placeholder="Логин" type="text" name="login"></input>
                <input placeholder="Пароль" type="password" name = "password"></input>
                <input placeholder="Должность" type="text" name = "position"></input>
                <Buttons type = "submit">Редактировать</Buttons>
        </form>
        <Footer />
        </div>
    )
}