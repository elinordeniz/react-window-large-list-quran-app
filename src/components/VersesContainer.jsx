import VersesList from "./VersesList";
import { useMemo} from "react";
import { useSelector } from "react-redux";
import { useGetAllVersesQuery } from "../features/api/apiSlice";
import { selectSearch } from "../features/collection/collectionSlice";
import { createSelector } from "@reduxjs/toolkit";

const VersesContainer = () => {
  const search = useSelector(selectSearch);

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

  const { filteredVerses, isLoading, isError, error, isSuccess } =
    useGetAllVersesQuery("OneVerses", {
      selectFromResult: (result, isLoading, isError, error, isSuccess) => ({
        ...result,
        filteredVerses: selectFiltered(result, search),
      }),
    });
  return (
    <VersesList
      verses={filteredVerses}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
    />
  );
};

export default VersesContainer;
