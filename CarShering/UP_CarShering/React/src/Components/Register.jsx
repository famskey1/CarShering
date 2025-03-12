import { useNavigate } from "react-router-dom";
import Buttons from "./Buttons";

export default function Register(){
    const navigate = useNavigate();
    async function HandleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const drivers = Object.fromEntries(formData.entries());

        if(!drivers.name || !drivers.surname || !drivers.login || !drivers.password || !drivers.num_bank_card || !drivers.cvc)
            {alert("Пожайлуста, заполните все поля!"); return;}
        try{
            const responce = await fetch("https://localhost:7040/drivers", {
                method: "POST", 
                headers:{"Accept": "application/json", "Content-Type": "application/json"},
                body: JSON.stringify({
                    name: drivers.name,
                    surname: drivers.surname,
                    secondname: drivers.secondname,
                    login: drivers.login,
                    password: drivers.password,
                    num_bank_card: drivers.num_bank_card,
                    cvc: drivers.cvc
                })
            })

            await responce.json();
            if(responce.ok) navigate("/transport_select")
                if(responce.status === 400){alert("Ошибка 400 (Bad Request)")}
        } catch(error){
            alert("Проблема с сервером " + error)
        }
    }
    
    return(
        <form onSubmit={HandleSubmit} className="inputs">
            <input type="text" placeholder="Фамилия" name = "surname"></input>
            <input type="text" placeholder="Имя" name = "name"></input>
            <input type="text" placeholder="Отчество (если есть)" name = "secondname"></input>            
            <input type="password" placeholder="Номер карты" name = "num_bank_card"></input>
            <input type="password" placeholder="CVV/CVC код" name = "cvc"></input>
            <input type="text" placeholder="Логин" name = "login"></input>
            <input type="password" placeholder="Пароль" name = "password"></input>
            <Buttons type = "submit">Зарегистрироваться</Buttons>
        </form>
    )
}