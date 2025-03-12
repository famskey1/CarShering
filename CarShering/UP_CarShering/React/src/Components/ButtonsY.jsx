export default function ButtonsY({children, onClick, type}){
    return(
        <>
        <button className="button_yellow" onClick={onClick} type = {type}>{children}</button>
        </>
    )
}