import { TfiDownload, TfiLink, TfiClose } from "react-icons/tfi";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedVerses,
  clearSelectedVerses,
  setDownloadClick,
} from "../features/collection/collectionSlice";
const Download = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedVerses = useSelector(selectSelectedVerses);
 console.log(selectedVerses)
  const handleDownload = (e) => {
    e.preventDefault();
    dispatch(setDownloadClick(true));
    navigate("/download");
  };
  return (
    <div className="download">
      <div className="actions">
        <button onClick={handleDownload}>
          PDF <TfiDownload />
        </button>

        <button>
          <Link to={`/collection/${selectedVerses.join(",")}`}><TfiLink /></Link>
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
