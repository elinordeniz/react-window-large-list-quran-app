import Verse from "./Verse";
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWindow } from "../hooks/useWindow"
import { useGetAllVersesQuery } from "../features/api/apiSlice";
import {
  selectSearch,
  selectVerseHeight,
  selectRowHeights,
  setRowHeight
} from "../features/collection/collectionSlice";
import { createSelector } from "@reduxjs/toolkit";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList as List } from "react-window";

const VersesContainer = () => {
  console.log("beginning VersesContainer");
  // const parentRef = useRef();
  const listRef = useRef();
  const sizeMap = useRef({});
  const rowHeights= useSelector(selectRowHeights)
  const search = useSelector(selectSearch);
  const verseHeight = useSelector(selectVerseHeight);

  const dispatch = useDispatch();
  
  const [windowWidth] = useWindow();
  const selectFiltered = useMemo(() => {
    console.log("Inside selectFiltered usememo");
    const emptyArray = [];
    // Return a unique selector instance for this page so that
    // the filtered results are correctly memoized
    return createSelector(
      (res) => res?.data,
      (res, search) => search?.toLocaleLowerCase(),
      (data, search) => {
        const filt = data?.filter((v) =>
          v.verse.toLocaleLowerCase().includes(search)
        );
        console.log(filt);
        return filt;
      }
    );
  }, [search]);

  const { filteredVerses } = useGetAllVersesQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      filteredVerses: selectFiltered(result, search),
    }),
  });

  console.log("after useGetAllVersesQuery");

  // const getItemSize = () => {
  //   //setHeight(ref.current?.offsetHeight);

  //   return verseHeight || 100;
  // };

  //   useLayoutEffect(() => {
  //     console.log(parentRef.current)

  //     // if (!ref?.current?.clientHeight) {
  //     //   return;
  //     // }

  //     // const handleResize = () => {
  //     //   setHeight(ref.current?.clientHeight);
  //     // };
  //     // setHeight(ref?.current?.offsetHeight);
  //     //  handleResize();
  //     // window.addEventListener('resize', handleResize);
  //     setHeight(parentRef.current?.clientHeight);
  //
  //  console.log(height)
  //     // return () => {
  //     //   window.removeEventListener('resize', handleResize);
  //     // }

  //   }, []);
  // const getRefHeight = parentRef.current?.getRefHeight();


    // console.log(parentRef.current?.getRefHeight())
    //  console.log(getRefHeight)
    // console.log(verseHeight);


    const getRowHeight= (index)=>{
       //console.log(rowHeights[index] + 8 || 120)
      return sizeMap.current[index] + 8 || 120 //rowHeights[index] + 8 || 120
      // rowHeights ? rowHeights[index] + 8 : 120

    }

    

   
  // useEffect(()=>{
  //   if(listRef.current){
  //     listRef.current.resetAfterIndex(0);
  //      console.log(listRef.current)
  //   }
  // }, [])
  // listRef.current?.resetAfterIndex(0);
 console.log(listRef.current)

 const setRowHeights = useCallback((index, size)=>{
   // rowHeights.current={...rowHeights.current, [index]: size}
 //  dispatch(setRowHeight({[i]: size}))
  sizeMap.current={...sizeMap.current, [index]:size}
  listRef.current?.resetAfterIndex(index);

 },[])
  console.log(filteredVerses)
  return (
    <section className="verses">
      {filteredVerses && (
        <AutoSizer>
          {({ width, height }) => (
            <List
              // useIsScrolling={true}
              width={width}
              height={height}
              itemCount={Object.values(filteredVerses).length}
              itemData={Object.values(filteredVerses)}
              itemSize={getRowHeight}
              ref={listRef}
            >
              {({ data, index, style }) => (
                <div style={style}>
                <Verse
                 
                  style={style}
                  index={index}
                  data={data[index]}
                  setRowHeights={setRowHeights}
                  windowWidth={windowWidth}
                /></div>
              )}
            </List>
          )}
        </AutoSizer>
      )}
    </section>
  );
};

export default VersesContainer;
