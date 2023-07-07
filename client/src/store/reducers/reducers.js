import { createReducer } from "@reduxjs/toolkit";

// uploaddata reducer
export const datareducer = createReducer(
  { loading: false, success: false },
  (builder) => {
    builder.addCase("uploadDataRequest", (state, action) => {
      return {
        loading: true,
        success: false,
      };
    });
    builder.addCase("uploadDataSuccess", (state, action) => {
      return {
        loading: false,
        success: true,
      };
    });
    builder.addCase("uploadDataFail", (state, action) => {
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    });
    builder.addCase("uploadDataClearErrors", (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
    builder.addCase("uploadDataReset", (state, action) => {
      return {
        success: false,
      };
    });
  }
);

// masterdata reducer
export const masterdatareducer = createReducer(
  { loading: false, data: [] },
  (builder) => {
    builder.addCase("masterDataRequest", (state, action) => {
      return {
        loading: true,
        data: [],
      };
    });
    builder.addCase("masterDataSuccess", (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase("masterDataFail", (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase("masterDataClearErrors", (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
  }
);

export const tabledatareducer = createReducer(
  { loading: false, data: [] },
  (builder) => {
    // get table data reducers
    builder.addCase("gettableDataRequest", (state, action) => {
      return {
        loading: true,
        data: [],
      };
    });
    builder.addCase("gettableDataSuccess", (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase("gettableDataFail", (state, action) => {
      return {
        loading: false,
        gettableerror: action.payload,
      };
    });
    builder.addCase("gettableDataClearErrors", (state, action) => {
      return {
        ...state,
        gettableerror: null,
      };
    });

    // delete table reducers
    builder.addCase("deleteTableRequest", (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase("deleteTableSuccess", (state, action) => {
      return {
        ...state,
        data: [],
        loading: false,
        isdeleted: true,
      };
    });
    builder.addCase("deleteTableFail", (state, action) => {
      return {
        ...state,
        loading: false,
        deletetableerror: action.payload,
      };
    });
    builder.addCase("deleteTableClearErrors", (state, action) => {
      return {
        ...state,
        deletetableerror: null,
      };
    });
    builder.addCase("deleteTableReset", (state, action) => {
      return {
        isdeleted: false,
      };
    });

    // delete row reducers
    builder.addCase("deleteRowRequest", (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase("deleteRowSuccess", (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase("deleteRowFail", (state, action) => {
      return {
        ...state,
        loading: false,
        deleterowerror: action.payload,
      };
    });
    builder.addCase("deleteRowClearErrors", (state, action) => {
      return {
        ...state,
        deleterowerror: null,
      };
    });

    // add row reducers
    builder.addCase("addRowRequest", (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase("addRowSuccess", (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase("addRowFail", (state, action) => {
      return {
        ...state,
        loading: false,
        addrowerror: action.payload,
      };
    });
    builder.addCase("addRowClearErrors", (state, action) => {
      return {
        ...state,
        addrowerror: null,
      };
    });

    // edit row reducers
    builder.addCase("editRowRequest", (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase("editRowSuccess", (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase("editRowFail", (state, action) => {
      return {
        ...state,
        loading: false,
        editrowerror: action.payload,
      };
    });
    builder.addCase("editRowClearErrors", (state, action) => {
      return {
        ...state,
        editrowerror: null,
      };
    });
  }
);
