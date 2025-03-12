import { useNavigate, useParams } from "react-router-dom";
import Buttons from "../../Buttons";
import HeaderAdm from "../../HeaderAdm";
import Footer from '../../Footer';
import Carfon from '../../Carfon';

export default function PutDrivers(){//Ошибка
    
    const navigate = useNavigate();
    async function HandleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const drivers = Object.fromEntries(formData.entries());

        if(!drivers.id_driver || !drivers.name || !drivers.surname || !drivers.login || !drivers.password || !drivers.num_bank_card || !drivers.cvc){alert("Пожайлуста, заполните все поля!"); return;}

        try{
            const responce = await fetch("https://localhost:7040/drivers", 
                {
                method: "PUT", 
                headers:{"Accept": "application/json", "Content-Type": "application/json"},
                body: JSON.stringify({
                    id_driver: parseInt(drivers.id_driver),
                    name: drivers.name,
                    surname: drivers.surname,
                    secondname: drivers.secondname,
                    login: drivers.login,
                    password: drivers.password,
                    num_bank_card: drivers.num_bank_card,
                    cvc: parseInt(drivers.cvc)
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
        <Carfon>Редактирование водителя</Carfon>
        <form onSubmit={HandleSubmit} className="inputs">
                <input placeholder="ID водителя" type="number" name="id_driver"></input>
                <input placeholder="Имя водителя" type="text" name="name"></input>
                <input placeholder="Фамилия водителя" type="text" name="surname"></input>
                <input placeholder="Отчество водителя (если есть)" type="text" name="secondname"></input>
                <input placeholder="Логин" type="text" name="login"></input>
                <input placeholder="Пароль" type="password" name = "password"></input>
                <input placeholder="Номер банковской карты" type="password" name = "num_bank_card"></input>
                <input placeholder="CVV/CVC код" type="password" name = "cvc"></input>
                <Buttons type = "submit">Редактировать</Buttons>
        </form>
        <Footer />
        </div>
    )
}