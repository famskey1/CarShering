import Buttons from "../../Buttons";
import HeaderAdm from "../../HeaderAdm";
import Footer from '../../Footer';
import Carfon from '../../Carfon';

export default function PostEmployees(){
    
    async function HandleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const employees = Object.fromEntries(formData.entries());

        if(!employees.name || !employees.surname || !employees.login || !employees.password){alert("Пожайлуста, заполните все поля!"); return;}

        try{
            const responce = await fetch("https://localhost:7040/employees", {
                method: "POST", 
                headers:{"Accept": "application/json", "Content-Type": "application/json"},
                body: JSON.stringify({
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
        <Carfon>Создание нового сотрудника</Carfon>
        <p></p>
        <h1>Учтите, если вы не указываете должность, то автоматически вставляется "Менеджер"</h1>
        <form onSubmit={HandleSubmit} className="inputs">
            <input type="text" placeholder="Фамилия" name = "surname"></input>
            <input type="text" placeholder="Имя" name = "name"></input>
            <input type="text" placeholder="Отчество (если есть)" name = "secondname"></input>
            <input type="text" placeholder="Логин" name="login"></input>
            <input type="text" placeholder="Пароль" name = "password"></input>
            <input type="text" placeholder="Должнось" name="position"></input>
            <Buttons type = "submit">Создать</Buttons>
        </form>
        <Footer />
        </div>
    )
}