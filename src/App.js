import React from "react";
import "./App.css";
import Carlist from "./components/Carlist";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function App() {
  return (
    <div className="App">
      <AppBar
        position="static"
        style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}
      >
        <Toolbar>
          <Typography variant="h6" style={{ fontSize: "3rem" }}>
            Cars
          </Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
    </div>
  );
}

export default App;
