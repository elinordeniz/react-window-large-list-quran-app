import { CopyToClipboard } from "react-copy-to-clipboard"
import {AiFillCopy} from 'react-icons/ai'
import { setSelectedVerses, selectSelectedVerses, setCopied, selectCopied, setVerseHeight,selectVerseHeight,selectRowHeights, setRowHeight } from "../features/collection/collectionSlice"
import { useDispatch, useSelector } from "react-redux"
import { useState, memo,useRef, useEffect, forwardRef,useImperativeHandle, useLayoutEffect } from "react"
import React from 'react'
import { areEqual } from 'react-window';

import ColorSearched from "./ColorSearched"

const Verse = (
  {
    index,
    style,
    data, 
    setRowHeights,
    windowWidth
  }
) => {
const localRef=useRef(null)
// useImperativeHandle(parentRef, // forwarded ref
// function () {
//   return {
//     getRefHeight() { return localRef.current.clientHeight }
//   } // the forwarded ref value
// }, [])



  const verseRow=data //[index];
  const {verse, id, name, desc}=verseRow
 console.log("Verse")
  const dispatch= useDispatch();
  const selectedVerses= useSelector(selectSelectedVerses)

  const verseHeight= useSelector(selectVerseHeight)
  const copied=useSelector(selectCopied);
  const rowHeights= useSelector(selectRowHeights)
 console.log(verseHeight)
  const toggleSelected = (id)=>{

    console.log("Inside Verse toggleSelected")
    if(selectedVerses.includes(id)){
      const newList=selectedVerses?.filter((s)=> s!==id)
      dispatch(setSelectedVerses(newList))
    }else{
      dispatch(setSelectedVerses([...selectedVerses, id]))
    }
  }
   let copyText=`"${desc?.split("-")[1]}. ${verse}" -  ${name}  `;

    // useEffect(()=>{
    //   dispatch(setVerseHeight(ref?.current?.clientHeight))
  
    //   console.log(ref?.current?.clientHeight)
    
   
    // }, [])
//     useLayoutEffect(()=>{
// dispatch(setVerseHeight(localRef.current?.clientHeight))

//     },[])
 console.log(localRef.current?.clientHeight)



//  useLayoutEffect(() => {
//   const handleResize = () => {
//     dispatch(setVerseHeight(localRef.current?.clientHeight))
//   };
//   handleResize();
//   window.addEventListener('resize', handleResize);

//   return () => {
//     window.removeEventListener('resize', handleResize);
//   }
// }, [verseHeight]);


//  console.log(rowHeights)
useEffect(()=>{

  setRowHeights(index, localRef.current.clientHeight) //getBoundingClientRect().height)
  
},[setRowHeights, index, windowWidth])
  return (
 
    <div ref={localRef}  className={`verse ${selectedVerses?.includes(desc) ? " selected" : ""}`}  >
      <h5  onClick={()=>toggleSelected(desc)}>{name}: </h5>
      <div className='verse-colors' >
      <span onClick={()=>toggleSelected(desc)}>
      <div    >{desc?.split("-")[1]}{". "} <ColorSearched verse={verse} /> </div>
      </span>
      <div className="copy">
      <CopyToClipboard text={copyText} onCopy={()=>dispatch(setCopied(desc))}>
      <AiFillCopy className="svg" />
      </CopyToClipboard>
      </div>
      
      </div>
      </div>
     

  )
}

const memoized=memo(Verse)
export default memoized