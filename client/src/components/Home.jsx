import React, { Fragment, useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import TableComponent from "./TableComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import {
  uploadDataReset,
  uploadData,
  uploadDataClearErrors,
} from "../store/actions/actions";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [refreshInput, setRefreshInput] = useState(Date.now());
  const { loading, error, success } = useSelector((state) => state.upload);

  const navigateMaster = () => {
    navigate("/master");
  };
  const handleFileUpload = (e) => {
    setData([]);
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
      setRefreshInput(Date.now());
    };
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(uploadData(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(uploadDataClearErrors());
    }
    if (success) {
      navigate("/master");
      dispatch(uploadDataReset());
    }
  }, [error, dispatch, success, navigate]);

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
              width: 1100,
              mx: "auto",
              marginTop:"10px"
            }}
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <Stack
              direction="column"
              justifyContent="start"
              alignItems="start"
              spacing={0.5}
            >
              <Typography>
               * Please provide basic column names in Employee Excel Data : name,salary,status, where status have entries either active or inactive, 
                 please keep these basic entries in lowercase
              </Typography>
            </Stack>
          </Box>
            <Box
              sx={{
                width: 400,
                mx: "auto",
              }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                color="secondary"
                size="medium"
                onClick={() => navigateMaster()}
                variant="outlined"
                sx={{ marginTop: "10px" }}
              >
                Previously Uploaded Data
              </Button>
              </Box>
          <form onSubmit={handleFormSubmit}>
            <Box
              sx={{
                width: 400,
                mx: "auto",
              }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                variant="outlined"
                sx={{ marginTop: "10px", marginBottom: "10px", width: "400" }}
              >
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  key={refreshInput}
                />
              </Button>
            </Box>
            {data.length > 0 && (
              <Box
                sx={{
                  width: "80vw",
                  mx: "auto",
                }}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <TableComponent data={data} />
              </Box>
            )}
            {data.length > 0 && (
              <Box
                sx={{
                  width: 200,
                  mx: "auto",
                }}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Stack direction={"column"}>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ marginTop: "10px" }}
                  >
                    Upload
                  </Button>
                  <Button>Previously Uploaded</Button>
                </Stack>
              </Box>
            )}
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;