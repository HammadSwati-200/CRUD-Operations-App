import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { useData } from "../context/DataContext";

export default function Profile() {
  const { selectedRowData } = useData();
  return (
    <Card
      sx={{
        width: 320,
        maxWidth: "100%",
        boxShadow: "lg",
      }}
    >
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Avatar src="/" sx={{ "--Avatar-size": "4rem" }} />
        <Typography level="title-lg">
          {selectedRowData ? selectedRowData.name : ""}
        </Typography>
        <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
          Hello, this is my bio and I am a PRO member of MUI. I am a developer
          and I love to code.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
            "& > button": { borderRadius: "2rem" },
          }}
        ></Box>
      </CardContent>
    </Card>
  );
}
