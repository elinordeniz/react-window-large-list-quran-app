import Verse from "./Verse";
import { useMemo, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useWindow } from "../hooks/useWindow";
import { useGetAllVersesQuery } from "../features/api/apiSlice";
import { selectSearch } from "../features/collection/collectionSlice";
import { createSelector } from "@reduxjs/toolkit";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList as List } from "react-window";
import Scroll from "./Scroll";

const VersesList= ({verses, isError, isLoading, isSuccess, error}) => {
  const listRef = useRef();
  const sizeMap = useRef({});


  const [windowWidth] = useWindow();


  const getRowHeight = (index) => {
    return sizeMap.current[index] + 8 || 120;
  };

  const setRowHeights = useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    listRef.current?.resetAfterIndex(index);
  }, []);
  return (
    <section className="verses"  >
      {isLoading && <p>Loading ...</p>}
      {isError && <p>{error}</p>}
      {verses && isSuccess && (
        
        <span className="contains" >
      <Scroll  ref={listRef} />

        <div style={{paddingBottom:"10px", paddingLeft:"8px"}}>{verses.length} adet sonuç:</div>
        <AutoSizer >
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              itemCount={Object.values(verses).length}
              itemData={Object.values(verses)}
              itemSize={getRowHeight}
              ref={listRef}
            >
              {({ data, index, style }) => {
                if(data[index]===undefined) return;
                return  <div style={style}>
                <Verse
                  style={style}
                  index={index}
                  data={data[index]}
                  setRowHeights={setRowHeights}
                  windowWidth={windowWidth}
                />
              </div>
              }}
            </List>
          )}
        </AutoSizer>
        </span>
      )}
    </section>
  );
};

export default VersesList;
