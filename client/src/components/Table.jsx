import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTableData,
  getTableDataClearErrors,
  deleteTable,
  deleteTableClearErrors,
  deleteTableReset,
  editRow,
  deleteRow,
  addRow,
} from "../store/actions/actions";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  DialogTitle,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TableData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [openEdit, setOpenEdit] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  let [tabledeleted, setTabledeleted] = useState(false);

  let { data, loading, gettableerror, isdeleted, deletetableerror } =
    useSelector((state) => state.table);
  let columns = [];
  if (data && data.length > 0) {
    columns = Object.keys(data[0]).map((item) => item);
  }

  const deleteEntireTable = async () => {
    setTabledeleted(true);
    await dispatch(deleteTable(id));
  };

  const addNewRow = async () => {
    setOpenEdit(true);
    setEditingRow(null);
  };

  const editExistingRow = async (row) => {
    await setEditingRow(row);
    setOpenEdit(true);
  };

  const handleSaveEdit = async () => {
    if (editingRow === null) {
      await dispatch(addRow(id, newRowData));
    } else {
      const updateddata = { ...editingRow, ...newRowData };
      await dispatch(editRow(id, editingRow.id, updateddata));
    }

    dispatch(getTableData(id));
    setOpenEdit(false);
    setEditingRow(null);
    setNewRowData({});
  };

  const deleteRowgivenid = async (rowid) => {
    await dispatch(deleteRow(id, rowid));
  };

  useEffect(() => {
    if (gettableerror) {
      console.log(gettableerror);
      dispatch(getTableDataClearErrors());
    }
    if (deletetableerror) {
      console.log(deletetableerror);
      dispatch(deleteTableClearErrors());
    }
    if (isdeleted) {
      navigate("/");
      dispatch(deleteTableReset());
    }
    if (isdeleted !== true && tabledeleted !== true) {
      dispatch(getTableData(id));
    }
  }, [gettableerror, deletetableerror, isdeleted, dispatch, navigate]);

  return (
    <Fragment>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Fragment>
          {data && data.length > 0 && (
            <Fragment>
              <Box>
                <Button color="success" variant="outlined" sx={{marginTop:"5px",marginRight:"5px"}} onClick={() => addNewRow()}>
                  Add Row <AddIcon />
                </Button>
                <Button color="error" variant="outlined" sx={{marginTop:"5px",marginRight:"5px"}}  onClick={()=>deleteEntireTable()}>
                  Delete Table <DeleteIcon />
                </Button>
                <Button  variant="outlined" sx={{marginTop:"5px",marginRight:"5px"}}  onClick={()=>navigateAnalyze()}>
                  Analyze Table
                </Button>
              </Box>
              <Box>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {columns.map((item, index) => (
                          <TableCell align="center" key={index}>
                            {item}
                          </TableCell>
                        ))}
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => (
                        <TableRow key={index}>
                          {Object.values(row).map((item, itemIndex) => (
                            <TableCell align="center" key={itemIndex}>
                              {item}
                            </TableCell>
                          ))}
                          <TableCell align="center">
                            <Button onClick={() => editExistingRow(row)}>
                              <EditIcon />
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <Button onClick={() => deleteRowgivenid(row.id)}>
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <DialogTitle textAlign="center">Edit Row</DialogTitle>
                <DialogContent>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                      sx={{
                        width: "100%",
                        minWidth: { xs: "300px", sm: "360px", md: "400px" },
                        gap: "1.5rem",
                      }}
                    >
                      {columns.map(
                        (column, index) =>
                          column !== "id" && (
                            <TextField
                              key={index}
                              label={column}
                              name={column}
                              value={
                                newRowData[column] || editingRow?.[column] || ""
                              }
                              onChange={(e) =>
                                setNewRowData({
                                  ...newRowData,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                          )
                      )}
                    </Stack>
                  </form>
                </DialogContent>
                <DialogActions sx={{ p: "1.25rem" }}>
                  <Button onClick={handleSaveEdit}>Save</Button>
                  <Button
                    color="secondary"
                    onClick={() => setOpenEdit(false)}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default TableData;
