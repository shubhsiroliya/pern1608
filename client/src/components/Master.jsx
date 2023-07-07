import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import {
  fetchMasterData,
  fetchMasterDataClearErrors,
} from "../store/actions/actions";

const Master = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRowClick = (tbid) => {
    navigate(`/table/${tbid}`);
  };

  const getTime = (strc) => {
    const str = parseInt(strc.replace("createdAt", ""));
    const time = new Date(str);
    const hours = time.getHours();
    const mins = time.getMinutes();
    const day = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")} ${day}/${month}/${year}`;
    return formattedTime;
  };

  const { data, loading, error } = useSelector((state) => state.master);
  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(fetchMasterDataClearErrors());
    }
    dispatch(fetchMasterData());
  }, [dispatch, error]);
  return (
    <Fragment>
      {loading ? (
        <>
          <p>Loading</p>
        </>
      ) : (
        <Fragment>
          <Box
            sx={{
              width: "80vw",
              mx: "auto",
            }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {data.length > 0 && (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">TableId</TableCell>
                      <TableCell align="center">CreatedAt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, index) => (
                      <TableRow
                        key={index}
                        onClick={() => {
                          handleRowClick(row.table_id);
                        }}
                      >
                        <TableCell align="center">{row.table_id}</TableCell>
                        <TableCell align="center">
                          {getTime(row.table_name)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Master;
