import { useCallback, useState } from "react";
import Square from "./Square";

function checkWining(boardState: number[], currentPlayer: string){
    const winingPosition = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for(let i = 0; i < winingPosition.length; i++){
            if(boardState[winingPosition[i][0]] &&  boardState[winingPosition[i][0]] === boardState[winingPosition[i][1]] && boardState[winingPosition[i][0]] == boardState[winingPosition[i][2]]){
                return currentPlayer
            }
    }

    return null;
}

export default ()=>{
    const [boardState, setBoardState] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState<string|null>(null);

    const handleChange = useCallback((index: number)=>{
        if(boardState[index] || winner) return;
        let newState = boardState.slice();
        newState[index] = xIsNext?"X":"O";
        setXIsNext(!xIsNext);
        setBoardState(newState);
        let winnerPlayer = checkWining(newState, newState[index]);
        console.log(winnerPlayer);
        if (winnerPlayer){
            setWinner(winnerPlayer);
        }
    }, [boardState]);

    let ar = Array.from({length: 3});

    return (
        <div>
            <WinnerBanner winner={winner}/>
            {
            ar.map((_, i)=> <div className="flex-container" key={"row"+i}>{ar.map((_, j)=> <Square onClick={()=>handleChange(i*3 + j)} value={boardState[i*3+j]} key={i*3 + j}/> )}</div>)
            }
        </div>
    )
}

function WinnerBanner({winner}: {winner: string|null}){
    return (
        <p className="winner-banner">{winner && <span>{winner} has won</span>}</p>
    )
}