import { useNavigate } from "react-router-dom";
import Buttons from "../../Buttons";
import { useState } from "react";
import HeaderAdm from "../../HeaderAdm";
import Footer from '../../Footer'
import Carfon from '../../Carfon';

export default function DeleteEmployees(){
    const navigate = useNavigate();
    let num;
    function Handle(event){
        num = parseInt(event.target.value);
    }
    function Delete(id){
    fetch("https://localhost:7040/employees/" + id, {
        method: "DELETE", 
    })
    .then(responce => {if(!responce.ok){throw new Error()} alert("Успешно!")})
        .catch(error => {alert("Проблема с сервером " + error)})
}

    return(
    <div className="container">
    <HeaderAdm />
    <Carfon>Удаление сотрудника</Carfon>
     <form className="inputs">
    <input placeholder="id_emplo" type="number" name="id_emplo" onChange={Handle}></input>
    <Buttons type = "button" onClick={() => Delete(num)}>Удалить</Buttons>
    </form>
    <Footer />
    </div>
)  
}