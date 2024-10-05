import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import useStockRequests from "../services/useStockRequests";
import { useEffect } from "react";
import FirmCard from "../components/Firms/FirmCard";
import FirmModal from "../components/Firms/FirmModal";
import Loading from "../components/Loading";

const Firm = () => {
  const { firms } = useSelector((state) => state.stock);
  const { getStock } = useStockRequests();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState(null); // Seçili firma verisi

  const handleOpen = (firm = null) => {
    setData(firm); // Firma verisi varsa set et, yoksa null
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData(null); // Modal kapanınca datayı sıfırla
  };
  useEffect(() => {
    getStock("firms");
  }, []);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", my: "1.5rem" }}
      >
        <Typography variant="h4">FIRMS</Typography>
        <Button onClick={() => handleOpen()} variant="contained">
          <AddCircleOutlineIcon />
        </Button>
      </Box>
      <FirmModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
      />
      <Grid container spacing={1}>
        {firms && firms.length > 0 ? (
          firms.map((firm) => (
            <FirmCard key={firm._id} firm={firm} handleOpen={handleOpen} />
          ))
        ) : (
          <Loading />
        )}
        
      </Grid>
    </>
  );
};

export default Firm;
