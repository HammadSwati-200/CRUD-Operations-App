import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

const Table = () => {
  const { setContextData } = useData();
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
  });
  const [newRowData, setNewRowData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function getData() {
      const fetchData = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const res = await fetchData.json();
      setData(res);
    }
    getData();
  }, []);

  // Handle Delete Button
  const deleteRow = (id) => {
    const updatedData = data.filter((row) => row.id !== id);
    setData(updatedData);
  };

  // Handle Edit Button
  const editRow = (index, rowData) => {
    setEditingIndex(index);
    setEditedData(rowData);
  };

  // Handle Save Button
  const saveRow = (index) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      name: editedData.name,
      email: editedData.email,
      address: {
        street: editedData.street,
        city: editedData.city,
      },
    };
    setData(newData);
    setEditingIndex(null);
  };

  // Handle Add New Button
  const addNew = () => {
    // Check if any of the new row fields are empty
    if (
      newRowData.name.trim() === "" ||
      newRowData.email.trim() === "" ||
      newRowData.street.trim() === "" ||
      newRowData.city.trim() === ""
    ) {
      // If any field is empty, open the Dialog
      setIsDialogOpen(true);
      return;
    }

    // Create a new row and add it to the data state
    const newRow = {
      name: newRowData.name,
      email: newRowData.email,
      address: {
        street: newRowData.street,
        city: newRowData.city,
      },
    };
    setData([...data, newRow]);

    // Clear the input fields for the next entry
    setNewRowData({
      name: "",
      email: "",
      street: "",
      city: "",
    });
  };

  // Handle input changes in the form for existing rows
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  // Handle input changes in the form for new row
  const handleNewRowInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData({
      ...newRowData,
      [name]: value,
    });
  };

  // Close the Dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Handle Cancel Button
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditedData({
      name: "",
      email: "",
      street: "",
      city: "",
    });
  };

  // Handle View Button
  const viewRow = (rowData) => {
    setContextData(rowData);
  };

  return (
    <div>
      <table className="table table-primary table-striped table-hover">
        <thead>
          <tr className="table-active">
            <th scope="col">S/No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => (
            <tr className="table-light" key={index}>
              <td>{index + 1}</td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  element.name
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  element.email
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      name="street"
                      value={editedData.street}
                      onChange={handleInputChange}
                    />
                    ,
                    <input
                      type="text"
                      name="city"
                      value={editedData.city}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  `${element.address.street}, ${element.address.city}`
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={() => saveRow(index)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={() => editRow(index, element)}
                  >
                    Edit
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteRow(element.id)}
                >
                  Delete
                </button>
                <Link
                  type="button"
                  className="btn btn-info ms-2"
                  onClick={() => viewRow(element)}
                  to="/ProfilePage"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex mb-5 justify-content-around">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-size-small"
            label="Name"
            variant="outlined"
            size="small"
            required
            name="name"
            value={newRowData.name}
            onChange={handleNewRowInputChange}
          />
          <TextField
            id="filled-size-small"
            label="Email"
            variant="outlined"
            size="small"
            required
            name="email"
            value={newRowData.email}
            onChange={handleNewRowInputChange}
          />
          <TextField
            id="filled-size-small"
            label="Street"
            variant="outlined"
            size="small"
            required
            name="street"
            value={newRowData.street}
            onChange={handleNewRowInputChange}
          />
          <TextField
            id="filled-size-small"
            label="City"
            variant="outlined"
            size="small"
            required
            name="city"
            value={newRowData.city}
            onChange={handleNewRowInputChange}
          />
        </Box>
        <button type="button" className="btn btn-primary my-2" onClick={addNew}>
          Add new
        </button>
      </div>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{"Empty Fields"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All fields are required. Please fill in all the fields before adding
            a new row.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Table;
