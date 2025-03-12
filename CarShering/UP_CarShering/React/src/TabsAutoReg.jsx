import Buttons from "./Components/Buttons"

export default function TabsAutoReg({active, onChange}){
    return(
        <section className="tabs">
            <Buttons isActive = {active === 'auto'} onClick = {() => onChange('auto')}>Авторизация</Buttons>
            <Buttons isActive = {active === 'reg'} onClick = {() => onChange('reg')}>Регистрация</Buttons>
        </section>
    )
}