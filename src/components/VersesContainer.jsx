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

const VersesContainer = () => {
  const listRef = useRef();
  const ref = useRef();
  const sizeMap = useRef({});
  const search = useSelector(selectSearch);


  const [windowWidth] = useWindow();
  const selectFiltered = useMemo(() => {
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
        return filt;
      }
    );
  }, [search]);

  const { filteredVerses, isLoading, isError, error, isSuccess } = useGetAllVersesQuery("OneVerses", {
    selectFromResult: (result, isLoading, isError, error, isSuccess) => ({
      ...result,
      filteredVerses: selectFiltered(result, search),
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
      {filteredVerses && isSuccess && (
        
        <span className="contains" >
      <Scroll  ref={listRef} />

        <div style={{paddingBottom:"10px", paddingLeft:"8px"}}>{filteredVerses.length} adet sonuç:</div>
        <AutoSizer >
          {({ width, height }) => (
            <List
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
                  />
                </div>
              )}
            </List>
          )}
        </AutoSizer>
        </span>
      )}
    </section>
  );
};

export default VersesContainer;
