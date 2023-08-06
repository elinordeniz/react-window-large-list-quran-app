import { selectSearch } from "../features/collection/collectionSlice"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ColorSearched = ({verse}) => {
 console.log("ColorSearched")
    const search= useSelector(selectSearch)
    const [result,setResult]= useState(verse);

useEffect(()=>{
    function getPortions(queryString, string) {
        if (queryString) {
          var rgxp = new RegExp("(\\S*)?(" + queryString + ")(\\S*)?", "ig");
          return string.replace(
            rgxp,
            (match) =>`<b style={{color:"blue", fontWeight:"600"}}> ${match} </b>`
          );
        }
        return verse
      }

  var res = getPortions(search, verse);
  setResult(res)

}, [search])

  return <span  dangerouslySetInnerHTML={{__html: result}}></span>;
};

export default ColorSearched;
