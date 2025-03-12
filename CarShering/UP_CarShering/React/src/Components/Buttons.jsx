export default function Buttons({children, onClick, type}){
    return(
        <>
        <button className="button" onClick={onClick} type = {type}>{children}</button>
        </>
    )
}