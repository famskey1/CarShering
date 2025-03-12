import Buttons from "../../Buttons";
import HeaderAdm from "../../HeaderAdm";
import Footer from '../../Footer';
import Carfon from '../../Carfon';

export default function PostTransport(){
    
    async function HandleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const tran = Object.fromEntries(formData.entries());

        if(!tran.type_tran || !tran.mark || !tran.model || !tran.cost || !tran.status){alert("Пожайлуста, заполните все поля!"); return;}

        try{
            const responce = await fetch("https://localhost:7040/transport", {
                method: "POST", 
                headers:{"Accept": "application/json", "Content-Type": "application/json"},
                body: JSON.stringify({
                    type_tran: tran.type_tran,
                    mark: tran.mark ,
                    model: tran.model,
                    cost: parseInt(tran.cost),
                    status: tran.status
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
        <Carfon>Создание нового транспорта</Carfon>
        <p></p>
        <form onSubmit={HandleSubmit} className="inputs">
            <input type="text" placeholder="Тип машины" name = "type_tran"></input>
            <input type="text" placeholder="Марка" name = "mark"></input>
            <input type="text" placeholder="Модель" name="model"></input>
            <input type="number" placeholder="Стоимость за 1 час" name = "cost"></input>
            <select name = "status">
                <option value="доступен">доступен</option>
                <option value="арендован">арендован</option>
                <option value="на_обслуживании">на_обслуживании</option>
            </select>
            <Buttons type = "submit">Создать</Buttons>
        </form>
        <Footer />
        </div>
    )
}