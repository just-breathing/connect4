import { FC,useState } from "react";
import Slot from "./Slot";

const Board:FC = () => {
    enum Player{
        p1="Red",
        p2="Black"
    }
    type Counter={
        [Player.p1]:0,
        [Player.p2]:0
    }
    const itemsPerRow=7;
    const [board, setBoard] = useState<string[][]>(Array(itemsPerRow).fill(Array(itemsPerRow).fill(null)));
    const [current,setCurrent]=useState<Player>(Player.p1);
    const [counter,setCounter]=useState<Counter>({Red:0,Black:0});


    const checkVertical = (row:number,col:number):boolean => {
        let count=1;
        for (let i=row-1;i>=0;i--){
            if (board[i][col]===current){
                count++;
            }else{
                break;
            }
        }
        for (let i=row+1;i<itemsPerRow;i++){
            if (board[i][col]===current){
                count++;
            }else{
                break;
            }
        }
        return count>=4;
    }
const checkHorizontal = (row:number,col:number):boolean => {
    let count=1;
    for (let i=col-1;i>=0;i--){
        if (board[row][i]===current){
            count++;
        }else{
            break;
        }
    }
    for (let i=col+1;i<itemsPerRow;i++){
        if (board[row][i]===current){
            count++;
        }else{
            break;
        }
    }
    return count>=4;
}    
    const checkDiagonal = (row:number,col:number):boolean => {
        let tlcount=1;
        let trCount=1
        let i=row-1;
        let j=col-1;
        while(i>=0 && j>=0){
            if (board[i][j]===current){
                tlcount++;
            }else{
                break;
            }
            i--;
            j--;
        }
        i=row+1;
        j=col+1;
        while(i<itemsPerRow && j<itemsPerRow){
            if (board[i][j]===current){
                tlcount++;
            }else{
                break;
            }
            i++;
            j++;
        }    
        i=row-1;
        j=col+1;
        while(i>=0 && j<itemsPerRow){
            if (board[i][j]===current){
                trCount++;
            }else{
                break;
            }
            i--;
            j++;
        }
        i=row+1;
        j=col-1;
        while(i<itemsPerRow && j>=0){
            if (board[i][j]===current){
                trCount++;
            }else{
                break;
            }
            i++;
            j--;
    }
    return tlcount>=4 || trCount>=4;

    }
    const checkWinner = (row:number,col:number):boolean => {
       return checkVertical(row,col) || checkHorizontal(row,col) || checkDiagonal(row,col);

    }

    const handleClick = (col:number):void => {
        console.log(board)
        console.log(col);
        let modRow=null;
        for(let row=board.length-1;row>=0;row--){
            if(board[row][col]==null){
                modRow=row;
                break;
            }
        }
        if (modRow!==null){
            setBoard(prevValues => {
                // Update the specific row and column
                const newRow = [...prevValues[modRow]];
                newRow[col] = current;
          
                // Return the new values array with the updated row
                return [
                  ...prevValues.slice(0, modRow),
                  newRow,
                  ...prevValues.slice(modRow + 1)
                ];
              });        
            
            const win = checkWinner(modRow,col)
            if (win)
            {
               setTimeout(()=>{alert(`Winner is ${current}`)},1);
            }
            setCurrent((current)=>(current===Player.p1)?Player.p2:Player.p1)
    
            setCounter(counter=>{
                return {...counter,[current]:counter[current]+1}})
        }
        else{
            alert("Column is full");

        }

    }
    return ( 

        <div className="text-3xl font-bold grid justify-center " >
            <h3>Tic Tac Toe Board </h3>
            <div className="grid grid-cols-2  " >
            <h5 className=" grid place-items-center" >Total Moves</h5>
            <div className="grid grid-rows-2" >
                <h5>{Player.p1}: {counter.Red}</h5>
                <h5>{Player.p2}: {counter.Black}</h5>
            </div>
            </div>
        <div className={` grid grid-cols-7 p-3  mt-5 border-2 border-black gap-x-[2px] gap-y-[2px]    mx-auto w-max h-max`} >
            {board.map((row,rowNo)=>(
                    row.map((cell,ColNo)=>(
                        <Slot key={rowNo+"-"+ColNo} ch={cell}  handleClick={() => handleClick(ColNo)} />
                    ))
            ))}
        </div>
            <h5 className="mt-5" >Current Player : {current}</h5>
        </div>
     );
}
 
export default Board;