import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Addcar from "./Addcar";

const Carlist = () => {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchcars();
  }, []);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const fetchcars = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then(response => response.json())
      .then(data => setCars(data._embedded.cars))
      .catch(err => console.log(err));
  };

  const deleteCar = link => {
    if (window.confirm("Are you sure you want to delete this car")) {
      fetch(link, { method: "DELETE" })
        .then(res => fetchcars())
        .then(res => setOpen(true))
        .catch(err => console.log(err));
    }
  };
  const columns = [
    {
      Header: "Brand",
      accessor: "brand"
    },
    {
      Header: "Model",
      accessor: "model"
    },
    {
      Header: "Color",
      accessor: "color"
    },
    {
      Header: "Year",
      accessor: "year"
    },
    {
      Header: "Fuel",
      accessor: "fuel"
    },
    {
      Header: "Price (€)",
      accessor: "price"
    },
    {
      accessor: "_links.self.href",
      Cell: ({ value }) => (
        <Button size="small" color="primary" onClick={() => deleteCar(value)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      {/* <h1>Cars List</h1> */}
      {/* <table>
        <tbody>
          {cars.map((car, index) => (
            <tr key={index}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <Addcar />
      <ReactTable
        defaultPageSize={10}
        data={cars}
        columns={columns}
        filterable={true}
        style={{ marginTop: "25px" }}
      />
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        autoHideDuration={3000}
        onClose={handleClose}
        message={<span id="message-id">Success! Car deleted</span>}
      />
    </div>
  );
};

export default Carlist;
