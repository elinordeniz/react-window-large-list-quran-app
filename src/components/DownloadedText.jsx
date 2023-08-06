import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import {
  selectSelectedVerses,
  clearSelectedVerses,
} from "../features/collection/collectionSlice";
import { useGetAllVersesQuery } from "../features/api/apiSlice";


const DownloadedText = () => {
  const selectedVerses = useSelector(selectSelectedVerses);
const ref=useRef(null)
  const { downloadVerses } = useGetAllVersesQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      downloadVerses: selectedVerses.map((desc) => {
        return result.data.find((v) => v.desc === desc);
      }),
    }),
  });
 console.log(ref)
  return (
    <div ref={ref}>{
        downloadVerses
      .map((v) => {
        return <p> ${v.desc}: ${v.verse}</p>
      })
        }
    </div>
  )
}

export default DownloadedText