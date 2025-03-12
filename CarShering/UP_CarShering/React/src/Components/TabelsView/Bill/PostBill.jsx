import Buttons from "../../Buttons";
import HeaderAdm from "../../HeaderAdm";
import Footer from '../../Footer';
import Carfon from '../../Carfon';

export default function PostBill(){
    
    async function HandleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(document.getElementById('post'));
        const dateStart = new Date(document.getElementById('startTime').value).toISOString();
        const dateEnd = new Date(document.getElementById('endTime').value).toISOString();
        formData.set('data_time_start', dateStart)
        formData.set('data_time_end', dateEnd)

        const bill = Object.fromEntries(formData);

        if(!bill.id_driver ||!bill.id_tran ||!bill.data_time_start|| !bill.data_time_end){alert("Пожайлуста, заполните все поля!"); return;}

        try{
            const responce = await fetch("https://localhost:7040/bill", {
                method: "POST", 
                headers:{"Accept": "application/json", "Content-Type": "application/json"},
                body: JSON.stringify(bill)
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
        <Carfon>Чек водителя</Carfon>
        <p></p>
        <form onSubmit={HandleSubmit} className="inputs" id="post">
        <input placeholder="ID сотрудника" type="text" name="id_emplo"></input>
        <input placeholder="ID водителя" type="text" name="id_driver"></input>
        <input placeholder="ID транспорта" type="text" name="id_tran"></input>
        <input placeholder="Дата начала взятия в аренду" name="data_time_start" type="datetime-local" id="startTime"></input>
        <input placeholder="Дата окончания" type="datetime-local" name="data_time_end" id="endTime"></input>
        <Buttons type = "submit">Создать</Buttons>
        </form>
        <Footer />
        </div>
    )
}