import { configureStore } from "@reduxjs/toolkit";
import {
  datareducer,
  masterdatareducer,
  tabledatareducer,
} from "./reducers/reducers";

const store = configureStore({
  reducer: {
    upload: datareducer,
    master: masterdatareducer,
    table: tabledatareducer,
  },
});

export default store;
