import { useParams, useNavigate } from "react-router-dom";
import { useGetAllVersesQuery } from "../features/api/apiSlice";
import VersesList from "./VersesList";
import { useEffect } from "react";

const Collection = () => {
  const { slugs } = useParams();
  const navigate = useNavigate();

  const verses = slugs.split(",");
  const { collectedVerses, isError, isSuccess, isLoading, error } =
    useGetAllVersesQuery("OneVerses", {
      selectFromResult: (result, isError, isSuccess, isLoading, error) => ({
        ...result,
        collectedVerses: verses.map((desc) => {
          return result?.data?.find((v) => v.desc === desc);
        }),
      }),
    });

  useEffect(() => {
    if (!collectedVerses.length || collectedVerses[0] === undefined) {
      navigate("/");
    }
  }, [collectedVerses]);
  return (
    <VersesList
      verses={collectedVerses}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
    />
  );
};

export default Collection;
