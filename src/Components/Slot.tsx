import { FC, useEffect } from "react";

interface Props {
    ch:string,

    handleClick:()=>void
}

const Slot:FC<Props> = ({ch,handleClick}) => {

    return ( 
        <div className={`sm:w-[45px] sm:h-[45px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px] border-2 border-black rounded-[100%]  ${ch==="Red" ? "bg-red-700" : (ch==="Black" ? "bg-black" : "bg-white")}   `} onClick={()=>handleClick()} >
        </div>
     );
}
 
export default Slot;