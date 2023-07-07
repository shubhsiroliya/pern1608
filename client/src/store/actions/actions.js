import axios from "axios";

export const uploadData = (data) => async (dispatch) => {
  try {
    dispatch({ type: "uploadDataRequest" });
    const result = await axios.post("/api/v1/upload", data);
    dispatch({
      type: "uploadDataSuccess",
      payload: result.success,
    });
  } catch (error) {
    dispatch({ type: "uploadDataFail", payload: error });
  }
};

export const uploadDataClearErrors = () => (dispatch) => {
  dispatch({ type: "uploadDataClearErrors" });
};

export const uploadDataReset = () => (dispatch) => {
  dispatch({ type: "uploadDataReset" });
};

export const fetchMasterData = () => async (dispatch) => {
  try {
    dispatch({ type: "masterDataRequest" });
    const result = await axios.get("/api/v1/master");
    dispatch({
      type: "masterDataSuccess",
      payload: result.data.data,
    });
  } catch (error) {
    dispatch({
      type: "masterDataFail",
      payload: error,
    });
  }
};
export const fetchMasterDataClearErrors = () => (dispatch) => {
  dispatch({ type: "masterDataClearErrors" });
};

export const getTableData = (id) => async (dispatch) => {
  try {
    dispatch({ type: "gettableDataRequest" });
    const result = await axios.get(`/api/v1/table/${id}`);
    dispatch({
      type: "gettableDataSuccess",
      payload: result.data.tabledata,
    });
  } catch (error) {
    dispatch({
      type: "gettableDataFail",
      payload: error,
    });
  }
};

export const getTableDataClearErrors = () => (dispatch) => {
  dispatch({ type: "gettableDataClearErrors" });
};

export const deleteTable = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteTableRequest",
    });
    await axios.delete(`/api/v1/table/${id}`);
    dispatch({
      type: "deleteTableSuccess",
    });
  } catch (error) {
    dispatch({
      type: "deleteTableFail",
      payload: error,
    });
  }
};

export const deleteTableClearErrors = () => (dispatch) => {
  dispatch({ type: "deleteTableClearErrors" });
};

export const deleteTableReset = () => (dispatch) => {
  dispatch({ type: "deleteTableReset" });
};

export const deleteRow = (id, rowid) => async (dispatch) => {
  try {
    dispatch({ type: "deleteRowRequest" });
    const data = await axios.delete(`/api/v1/row/${id}?rowid=${rowid}`);
    dispatch({
      type: "deleteRowSuccess",
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({ type: "deleteRowFail", payload: error });
  }
};

export const deleteRowClearErrors = () => (dispatch) => {
  dispatch({ type: "deleteRowClearErrors" });
};

// add row
export const addRow = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: "addRowRequest" });
    const result = await axios.post(`/api/v1/row/${id}`, data);
    dispatch({
      type: "addRowSuccess",
      payload: result.data.result,
    });
  } catch (error) {
    dispatch({ type: "addRowFail", payload: error });
  }
};

export const addRowClearErrors = () => (dispatch) => {
  dispatch({ type: "addRowClearErrors" });
};

// edit row
export const editRow = (id, rowid, data) => async (dispatch) => {
  try {
    dispatch({ type: "editRowRequest" });
    const result = await axios.put(`/api/v1/row/${id}?rowid=${rowid}`, data);
    dispatch({
      type: "editRowSuccess",
      payload: result.data.result,
    });
  } catch (error) {
    dispatch({ type: "editRowFail", payload: error });
  }
};

export const editRowClearErrors = () => (dispatch) => {
  dispatch({ type: "editRowClearErrors" });
};
