import Search from "./Search";
import Navbar from "./Navbar";
import {
  selectSelectedVerses,
  clearSelectedVerses,
} from "../features/collection/collectionSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Download from "./Download";
import { TfiAngleLeft } from "react-icons/tfi";
const Header = () => {
  const selectedVerses = useSelector(selectSelectedVerses);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [homeButton, setHomeButton] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setHomeButton(true);
    }
  }, [location]);
  const goHome = () => {
    dispatch(clearSelectedVerses());
    setHomeButton(false);
    navigate("/");
  };
  return (
    <>
      <Navbar />
      <header className="header">
        {homeButton && (
          <button className="back-btn" onClick={goHome}>
            <TfiAngleLeft />
            Ana sayfa
          </button>
        )}
        {!homeButton && <Search />}
        {selectedVerses?.length !== 0 && <Download />}
      </header>
    </>
  );
};

export default Header;
