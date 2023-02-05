export default ({onClick, value}:{onClick: any, value?: String})=>{
    
    return (
        <button className="square" onClick={onClick} >
            {value}
        </button>
    )
}