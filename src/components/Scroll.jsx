import {IoIosArrowDropupCircle} from "react-icons/io"
import { forwardRef } from "react";

const Scroll = forwardRef((undefined, ref) => {
    const scrollTop=(e)=>{
        e.preventDefault();
        let refer=ref.current    
        refer.scrollToItem(0);
    
      }
  return (
    <div className='scroll' onClick={scrollTop}><IoIosArrowDropupCircle /></div>
  )
})

export default Scroll