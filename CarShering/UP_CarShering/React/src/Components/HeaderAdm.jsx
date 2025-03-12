import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Header(){
    const [info, setInfo] = useState();
    const navigate = useNavigate();
    function getInfo(){
        const body = JSON.parse(localStorage.getItem('Body'));

        if(body) {setInfo(body);}
        else alert('Ошибка');
    };

    useEffect(getInfo,[]);
    
    return(
    <header className ='headercont'>
        <div className='list'>
            <div className="item">Каршеринг ООО "КЧАУ"</div>
            <div className="item">Каршеринг ООО "КЧАУ"</div>
            <Link className = 'item' to="/">На главную(Выйти)</Link>
        </div>
    </header>
    )
}
