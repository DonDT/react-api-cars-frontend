import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Addcar from "./Addcar";
import Editcar from "./Editcar";
import { CSVLink, CSVDownload } from "react-csv";
import Grid from "@material-ui/core/Grid";

const Carlist = () => {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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
        .then(res => setMessage("Car Deleted"))
        .then(res => setOpen(true))
        .catch(err => console.log(err));
    }
  };

  const saveCar = newCar => {
    fetch("https://carstockrest.herokuapp.com/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCar)
    })
      .then(res => fetchcars())
      .catch(err => console.log(err));
  };

  const updateCar = (car, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(car)
    })
      .then(res => fetchcars())
      .catch(err => console.log(err));
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
      sortable: false,
      filterable: false,
      width: 100,
      Cell: row => <Editcar car={row.original} updateCar={updateCar} />
    },
    {
      sortable: false,
      filterable: false,
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
      <Grid container>
        <Grid item>
          <Addcar saveCar={saveCar} setOpen={setOpen} />
        </Grid>
        <Grid item style={{ padding: 15 }}>
          <CSVLink data={cars}>Export Data</CSVLink>
        </Grid>
      </Grid>
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
        message={message}
      />
    </div>
  );
};

export default Carlist;
