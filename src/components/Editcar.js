import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// JS.coach. here we can find various components to use in raect

const Addcar = props => {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    year: "",
    price: ""
  });

  const handleClickOpen = () => {
    setCar({
      brand: props.car.brand,
      model: props.car.model,
      color: props.car.color,
      fuel: props.car.fuel,
      year: props.car.year,
      price: props.car.price
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    setCar({
      ...car,
      [event.target.name]: event.target.value
    });
    console.log(car);
  };

  const updateCar = () => {
    props.updateCar(car, props.car._links.car.href);
    handleClose();
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Edit Car{" "}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit car</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill Car information here</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="brand"
            value={car.brand}
            onChange={e => handleInputChange(e)}
            label="Brand"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            name="model"
            value={car.model}
            onChange={e => handleInputChange(e)}
            label="Model"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            value={car.color}
            onChange={e => handleInputChange(e)}
            name="color"
            label="Color"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            value={car.year}
            onChange={e => handleInputChange(e)}
            name="year"
            label="Year"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            value={car.fuel}
            onChange={e => handleInputChange(e)}
            name="fuel"
            label="Fuel"
            fullWidth
          />
          <TextField
            margin="dense"
            value={car.price}
            onChange={e => handleInputChange(e)}
            id="name"
            name="price"
            label="price (€)"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateCar} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Addcar;
