import Buttons from "../../Buttons";
import HeaderAdm from "../../HeaderAdm";
import Footer from '../../Footer';
import Carfon from '../../Carfon';
import moment from "moment";
import 'moment/locale/ru';

export default function PutBill(){
    
    async function HandleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(document.getElementById('put'));
        const dateStart = new Date(document.getElementById('startTime').value).toISOString();
        const dateEnd = new Date(document.getElementById('endTime').value).toISOString();
        formData.set('data_time_start', dateStart)
        formData.set('data_time_end', dateEnd)
        const bill = Object.fromEntries(formData);

        if(!bill.id_bill || !bill.id_emplo || !bill.id_driver ||!bill.id_tran ||!bill.data_time_start|| !bill.data_time_end){alert("Пожайлуста, заполните все поля!"); return;}

        try{
            const responce = await fetch("https://localhost:7040/bill", 
                {
                method: "PATCH", 
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
        <HeaderAdm/>
        <Carfon>Редактирование чека</Carfon>
        <p></p>
        <form onSubmit={HandleSubmit} className="inputs" id="put">
            <input placeholder="ID чека" type="number" name="id_bill"></input>
            <input placeholder="ID сотрудника" type="number" name="id_emplo"></input>
            <input placeholder="ID водителя" type="number" name="id_driver"></input>
            <input placeholder="ID транспорта" type="number" name="id_tran"></input>
            <input placeholder="Дата начала взятия в аренду" type="datetime-local" name="data_time_start" id="startTime"></input>
            <input placeholder="Дата окончания" type="datetime-local" name="data_time_end" id = "endTime"></input>
            <Buttons type = "submit">Редактировать</Buttons>
        </form>
        <Footer />
        </div>
    )
}