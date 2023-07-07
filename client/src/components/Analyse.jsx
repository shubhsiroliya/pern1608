import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTableData,
  getTableDataClearErrors,
} from "../store/actions/actions";
import { Button } from "@mui/material";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Doughnut, Line } from "react-chartjs-2";
import ListIcon from "@mui/icons-material/List";

const Analyse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data,
    loading,
    gettableerror: error,
  } = useSelector((state) => state.table);
  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(getTableDataClearErrors());
    }
    dispatch(getTableData(id));
  }, [dispatch, error, id]);

  const navigateMaster = () => {
    navigate("/master");
  };

  const getActiveEmployeesCount = () => {
    return data.filter((employee) => employee.status === "active").length;
  };

  const getBarChartData = () => {
    const labels = data.map((employee) => employee.name);
    const salaryData = data.map((employee) => employee.salary);
    return {
      labels: labels,
      datasets: [
        {
          label: "Salary",
          data: salaryData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const getPieChartData = () => {
    const activeEmployeesCount = getActiveEmployeesCount();
    const inactiveEmployeesCount = data.length - activeEmployeesCount;
    return {
      labels: ["Active", "Inactive"],
      datasets: [
        {
          data: [activeEmployeesCount, inactiveEmployeesCount],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <Fragment>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Fragment>
          <h3>Total Employees: {data.length}</h3>
          <h3>Active Employees: {getActiveEmployeesCount()}</h3>

          <div style={{ width: "400px", margin: "auto" }}>
            <Line
              data={getBarChartData()}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>

          <div style={{ width: "400px", margin: "auto" }}>
            <Doughnut data={getPieChartData()} />
          </div>
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={() => navigateMaster()}
          >
            View All Tables
            <ListIcon />
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Analyse;
