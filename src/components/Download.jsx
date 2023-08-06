import { TfiDownload, TfiLink, TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedVerses,
  clearSelectedVerses,
} from "../features/collection/collectionSlice";
const Download = () => {
  console.log("Download");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedVerses = useSelector(selectSelectedVerses);

  const handleDownload= (e)=>{
    e.preventDefault();
    navigate('/download');
  }
  return (
    <div className="download">
      <div className="actions">
        <button onClick={handleDownload}>
          PDF <TfiDownload />
        </button>

        <button>
          <TfiLink />
        </button>
      </div>
      <div className="selected" onClick={() => dispatch(clearSelectedVerses())}>
        <TfiClose />
        {selectedVerses.length} ayet toplandı.
      </div>
    </div>
  );
};

export default Download;
