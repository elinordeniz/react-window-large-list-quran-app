import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  selectedVerses: [],
  searchedVerses: [{}],
  downloadClicked: false,
};
export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setSelectedVerses: (state, action) => {
      state.selectedVerses = action.payload;
    },
    clearSelectedVerses: (state, action) => {
      state.selectedVerses = [];
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCopied: (state, action) => {
      state.copied = action.payload;
    },
    setSearchedVerses: (state, action) => {
      const data = action.payload;
      state.searchedVerses = action.payload;
    },
    setDownloadClick: (state, action) => {
      state.downloadClicked = action.payload;
    },
  },
});

export const {
  setSelectedVerses,
  clearSelectedVerses,
  setSearch,
  setCopied,
  setSearchedVerses,
  setDownloadClick,
} = collectionSlice.actions;
export default collectionSlice.reducer;

export const selectSearch = (state) => state.collection.search;
export const selectCopied = (state) => state.collection.copied;
export const selectSelectedVerses = (state) => state.collection.selectedVerses;
export const selectSearchedVerses = (state) => state.collection.searchedVerses;
export const selectDownloadClicked = (state) =>
  state.collection.downloadClicked;
