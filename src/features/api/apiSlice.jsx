import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
// const versesAdapter = createEntityAdapter({});
// const initialState = versesAdapter.getInitialState();

export const apiSlice = createApi({
  reducerPath: "quranApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist",
  }),
  tagTypes: ["Verse"],
  endpoints: (builder) => ({
    getAllVerses: builder.query({
      query: () => "/quran_tr.json",
      keepUnusedDataFor: 30000,
      transformResponse: (res) => {
        const versesList = [];
        res.forEach(({ verses, translation, id }) => {
          verses.forEach((ayah, index) => {
            let obj = {};
            obj.id = index;
            obj.desc = `${id}-${ayah.id}`;
            obj.name = translation;
            obj.verse = ayah.translation;
            versesList.push(obj);
          });
        });
        versesList.map((verse, index) => {
          verse.id = index;
          return verse;
        });
        return versesList //versesAdapter.setAll(initialState, versesList);
      },
      providesTags: ["Verse"]
    }),
  }),
//   overrideExisting: false,
});

export const { useGetAllVersesQuery } = apiSlice;

// const selectResult= apiSlice.endpoints.getAllVerses.select();

// export const adapterSelectors = createSelector(
//     selectResult,
//     (result) => result.data 
//   )

//   export const {
//     selectAll,
//     selectById

//     // Pass in a selector that returns the tasks slice of state
// } = versesAdapter.getSelectors((state) => adapterSelectors(state) ?? initialState)

// export const selectFiltered= createSelector(
//     selectResult,
//     ()
// )

// //  export const {selectEntities}= versesAdapter.getSelectors((state)=> adapterSelectors(state) ?? initialState)

// // //  const {selectEntities} = versesAdapter.getSelectors()
// // //  export const selectAllVerses= selectEntities;

// // export const selectSearchResult = createSelector(
// //     selectEntities,
// //   (res) => res.map((v)=>v) //normalized state object with ids & entities
// // );

// // const versesSelector = versesAdapter.getSelectors((state)=> adapterSelectors(state) ?? initialState)

// // And then use the selectors to retrieve values
// // export const allVerses = versesSelector.selectIds()