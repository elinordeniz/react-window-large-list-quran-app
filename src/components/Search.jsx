import { TfiSearch } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  selectSearch,
} from "../features/collection/collectionSlice";

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const handleChange = (e) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <div className="search">
      <div className="icon">
        <TfiSearch />{" "}
      </div>
      <input
        name="search"
        type="text"
        placeholder="Meal Ara"
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
