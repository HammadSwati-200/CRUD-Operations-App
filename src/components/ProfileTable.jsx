// ProfileTable.js
import React from "react";
import { useData } from "../context/DataContext";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";

const ProfileTable = () => {
  const { selectedRowData } = useData();

  return (
    <div className="w-50 mt-4">
      <Table aria-label="basic table">
        <tbody>
          <tr>
            <td>
              <Typography level="title-lg">Name :</Typography>
            </td>
            <td>{selectedRowData ? selectedRowData.name : ""}</td>
          </tr>
          <tr>
            <td>
              <Typography level="title-lg">Email :</Typography>
            </td>
            <td>{selectedRowData ? selectedRowData.email : ""}</td>
          </tr>
          <tr>
            <td>
              <Typography level="title-lg">Street :</Typography>
            </td>
            <td>{selectedRowData ? selectedRowData.address.street : ""}</td>
          </tr>
          <tr>
            <td>
              <Typography level="title-lg">City :</Typography>
            </td>
            <td>{selectedRowData ? selectedRowData.address.city : ""}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProfileTable;
