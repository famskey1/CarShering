import Buttons from "../../Buttons";
import { useState } from "react";
import HeaderAdm from "../../HeaderAdm";
import Footer from '../../Footer'
import Carfon from '../../Carfon';

export default function DeleteTransport(){
    let num;
    function Handle(event){
        num = parseInt(event.target.value);
    }
    function Delete(id){
    fetch("https://localhost:7040/transport/" + id, {
        method: "DELETE", 
    })
    .then(responce => {if(!responce.ok){throw new Error()} alert("Успешно!")})
        .catch(error => {alert("Проблема с сервером " + error)})
}

    return(
    <div className="container">
    <HeaderAdm />
    <Carfon>Удалить транспорт</Carfon>
     <form className="inputs">
    <input placeholder="ID транспорта" type="number" name="id_tran" onChange={Handle}></input>
    <Buttons type = "button" onClick={() => Delete(num)}>Удалить</Buttons>
    </form>
    <Footer />
    </div>
)  
}