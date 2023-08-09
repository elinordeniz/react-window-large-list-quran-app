import { useSelector, useDispatch } from "react-redux";
import {
  selectCopied,
  setCopied,
} from "../features/collection/collectionSlice";
import { useEffect } from "react";

const Copied = () => {
  const copied = useSelector(selectCopied);
  const ayah = copied.split("-")[1];
  const surah = copied.split("-")[0];
  const dispatch = useDispatch();
  useEffect(() => {
    let timeout;
    if (copied) {
      timeout = setTimeout(() => {
        dispatch(setCopied(""));
      }, 600);
    }
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <div className="copied">{`${surah}. sure, ${ayah}. ayet kopyalandı. `}</div>
  );
};

export default Copied;
