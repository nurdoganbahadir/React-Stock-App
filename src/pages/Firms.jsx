import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import useStockRequests from "../services/useStockRequests";
import { useEffect } from "react";
import FirmCard from "../components/Firms/FirmCard";
import FirmModal from "../components/Firms/FirmModal";

const Firm = () => {
  const { firms } = useSelector((state) => state.stock);
  const { getStock } = useStockRequests();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getStock("firms");
  }, [firms]);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", my: "1.5rem" }}
      >
        <Typography variant="h4">FIRMS</Typography>
        <Button onClick={handleOpen} variant="contained">
          <AddCircleOutlineIcon />
        </Button>
      </Box>
      <FirmModal open={open} handleClose={handleClose} />
      <Grid container spacing={1}>
        {firms && firms.length > 0 ? (
          firms.map((firm) => <FirmCard firm={firm} />)
        ) : (
          <p>Veri yükleniyor veya firma bulunamadı.</p>
        )}
      </Grid>
    </>
  );
};

export default Firm;
