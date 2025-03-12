import { useNavigate } from "react-router-dom";
import Buttons from "./Buttons";
import { useState } from "react"

export default function LoginPass(){
  const navigate = useNavigate();
  const [login, SetLogin] = useState('');
  const [password, SetPassword] = useState('');

  async function LPE(login, password) {
    const formdata = new FormData();
    formdata.append('login', login)
    formdata.append('password', password)
    const findata = JSON.stringify(Object.fromEntries(formdata))
      if( !password || !login){alert('Пожайлуста, заполните все поля'); return;}
      try{
        const responce = await fetch('https://localhost:7040/employees/login', {
          method:"POST",
          headers: {"Accept": "application/json", "Content-Type":  "application/json"},
          body: findata
        })
        const data = await responce.json();
        if(responce.ok){
          localStorage.setItem('body', JSON.stringify(data.driver));
          localStorage.setItem('tokenKey', data.token);
          if(login == 'Admin' && password == '111'){
            navigate('/adminpanel')
          }
          else{
            navigate('/emplopanel')
          }
          console.log(data.token);
        }
        if(responce.status === 400) alert("Ошибка 400 (Bad Request)")
      }catch(error){alert("Проблема с сервером " + error)}
  }
  async function LPD(login, password) {
    const formdata = new FormData();
    formdata.append('login', login)
    formdata.append('password', password)
    const findata = JSON.stringify(Object.fromEntries(formdata))
      if( !password || !login){alert('Пожайлуста, заполните все поля'); return;}
      try{
        const responce = await fetch('https://localhost:7040/drivers/login', {
          method:"POST",
          headers: {"Accept": "application/json", "Content-Type":  "application/json"},
          body: findata
        })
        const data = await responce.json();
        if(responce.ok){
          localStorage.setItem('body', JSON.stringify(data.driver));
          localStorage.setItem('tokenKey', data.token);
          navigate('/transport_select')
          console.log(data.token);
        }
        if(responce.status === 400) alert("Ошибка 400 (Bad Request)")
      }catch(error){alert("Проблема с сервером " + error)}
    }

  return (
    <div className='inputs' id='log'>
    <input type="text" placeholder="Логин" name = "login" onChange={(e) => SetLogin(e.target.value)}/>
    <input type="password" placeholder="Пароль" name = "password" onChange={(e) => SetPassword(e.target.value)}/>
    <Buttons type = "submit" onClick={() => LPE(login, password)}>Войти сотруднику</Buttons>
    <Buttons type = "submit" onClick={() => LPD(login, password)}>Войти простому заводчанину</Buttons>
    </div>  
    );
}