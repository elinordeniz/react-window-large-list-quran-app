import Search from "./Search"
import Navbar from "./Navbar"
import { selectSelectedVerses } from "../features/collection/collectionSlice";
import { useSelector } from "react-redux";
import Download from "./Download";
const Header = () => {
   console.log("Header")
    const selectedVerses= useSelector(selectSelectedVerses);

  return (
    <>
        <Navbar />
        <header className='header'>
        <Search />
       {selectedVerses?.length!==0 && <Download />} 
        </header>
    </>
  )
}

export default Header