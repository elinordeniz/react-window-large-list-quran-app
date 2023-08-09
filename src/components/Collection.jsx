import { useMemo, useRef, useCallback } from "react";
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useGetAllVersesQuery } from "../features/api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedVerses,
  setDownloadClick,
  selectDownloadClicked,
} from "../features/collection/collectionSlice";
import { useWindow } from "../hooks/useWindow";

import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList as List } from "react-window";
import Scroll from "./Scroll";
import Verse from "./Verse";



const Collection = () => {
  const listRef = useRef();
  const sizeMap = useRef({});
const [windowWidth] = useWindow();
    const {slugs}=useParams();
    const verses=slugs.split(",")
     console.log(verses)
      console.log(slugs)
    const { collectedVerses, isError, isSuccess, isLoading, error } = useGetAllVersesQuery("OneVerses", {
        selectFromResult: (result, isError, isSuccess, isLoading, error) => ({
          ...result,
          collectedVerses: verses.map((desc) => {
            return result?.data?.find((v) => v.desc === desc);
          }),
        }),
      });
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
    {collectedVerses && isSuccess && (
      
      <span className="contains" >
    <Scroll  ref={listRef} />

      <div style={{paddingBottom:"10px", paddingLeft:"8px"}}>{collectedVerses.length} adet sonuç:</div>
      <AutoSizer >
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            itemCount={Object.values(collectedVerses).length}
            itemData={Object.values(collectedVerses)}
            itemSize={getRowHeight}
            ref={listRef}
          >
            {({ data, index, style }) => {
                if(data[index]===undefined) return;

           return (<div style={style}>
                <Verse
                  style={style}
                  index={index}
                  data={data[index]}
                  setRowHeights={setRowHeights}
                  windowWidth={windowWidth}
                />
              </div>)
}}
          </List>
        )}
      </AutoSizer>
      </span>
    )}
  </section>
  )
}

export default Collection