import Buttons from "./Components/Buttons"

export default function TabsEmplo({active, onChange}){
    return(
        <section className="inputs">
            <Buttons isActive = {active === 'drivers'} onClick = {() => onChange('drivers')}>Водители</Buttons>
            <Buttons isActive = {active === 'tran'} onClick = {() => onChange('tran')}>Транспорт</Buttons>
            <Buttons isActive = {active === 'bill'} onClick = {() => onChange('bill')}>Чеки</Buttons>
        </section>
    )
}