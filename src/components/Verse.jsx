import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillCopy } from "react-icons/ai";
import {
  setSelectedVerses,
  selectSelectedVerses,
  setCopied,
} from "../features/collection/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { memo, useRef, useEffect } from "react";
import React from "react";

import ColorSearched from "./ColorSearched";

const Verse = ({ index, style, data, setRowHeights, windowWidth }) => {
  const localRef = useRef(null);

  const verseRow = data;
  const { verse, id, name, desc } = verseRow;
  const dispatch = useDispatch();
  const selectedVerses = useSelector(selectSelectedVerses);

  const toggleSelected = (id) => {
    if (selectedVerses.includes(id)) {
      const newList = selectedVerses?.filter((s) => s !== id);
      dispatch(setSelectedVerses(newList));
    } else {
      dispatch(setSelectedVerses([...selectedVerses, id]));
    }
  };
  let copyText = `"${desc?.split("-")[1]}. ${verse}" -  ${name}  `;

  useEffect(() => {
    setRowHeights(index, localRef.current.clientHeight);
  }, [setRowHeights, index, windowWidth]);
  return (
    <div
      ref={localRef}
      className={`verse ${selectedVerses?.includes(desc) ? " selected" : ""}`}
    >
      <h5 onClick={() => toggleSelected(desc)}>{name}: </h5>
      <div className="verse-colors">
        <span onClick={() => toggleSelected(desc)}>
          <div>
            <b >{desc?.split("-")[1]} {". "}</b>
             <ColorSearched verse={verse} />{" "}
          </div>
        </span>
        <div className="copy">
          <CopyToClipboard
            text={copyText}
            onCopy={() => dispatch(setCopied(desc))}
          >
            <AiFillCopy className="svg" />
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

const memoized = memo(Verse);
export default memoized;
