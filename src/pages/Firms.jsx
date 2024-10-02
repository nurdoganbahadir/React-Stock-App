import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Firm = () => {
  return (
    <>
      <h1>FIRMS</h1>
      <Button variant="contained">
        <AddCircleOutlineIcon />
      </Button>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <IconButton aria-label="add to favorites">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Firm;
