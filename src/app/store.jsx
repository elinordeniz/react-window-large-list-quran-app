import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../features/api/apiSlice";
import { collectionSlice } from "../features/collection/collectionSlice";

export const store = configureStore({
  reducer: {
    collection: collectionSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch); //bunu use query hooklarda options eklemek için kullanacağız
