import { createSlice } from "@reduxjs/toolkit";
import {useGetAllVersesQuery} from "../api/apiSlice";



const initialState = {
  search: "",
  selectedVerses: [],
  searchedVerses:[{}],
  verseHeight:undefined,
  rowHeights:{},

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
    setSearchedVerses: (state, action)=>{
      const data=action.payload;
      state.searchedVerses=action.payload
    },
    setVerseHeight: (state,action)=>{
      state.verseHeight=action.payload
    },
    setRowHeight: (state, action)=>{
       console.log(action.payload)
       const paylo=action.payload
      state.rowHeights={...state.rowHeights ,...paylo}
       console.log(state.rowHeights)
    },

  },
});

export const { setSelectedVerses, clearSelectedVerses, setSearch, setCopied, setSearchedVerses,setVerseHeight,setRowHeight } =
  collectionSlice.actions;
export default collectionSlice.reducer;

export const selectSearch = (state) => state.collection.search;
export const selectCopied = (state) => state.collection.copied;
export const selectSelectedVerses = (state) => state.collection.selectedVerses;
export const selectSearchedVerses = (state) => state.collection.searchedVerses;
export const selectVerseHeight = (state) => state.collection.verseHeight;
export const selectRowHeights = (state) => state.collection.rowHeights;


