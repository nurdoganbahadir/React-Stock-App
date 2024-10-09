import React, { useState } from "react";
import { useSelector } from "react-redux";
import useStockRequests from "../services/useStockRequests";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BrandCard from "../components/Brands/BrandCard";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import BrandModal from "../components/Brands/BrandModal";
import Loading from "../components/Loading";
import { NoDataMessage } from "../components/Messages";

const Brands = () => {
  const { brands, loading } = useSelector((state) => state.stock);
  const { getStock } = useStockRequests();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState(null);

  const handleOpen = (brand = null) => {
    setData(brand); // Firma verisi varsa set et, yoksa null
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData(null); // Modal kapanınca datayı sıfırla
  };

  React.useEffect(() => {
    getStock("brands");
  }, []);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", my: "1.5rem" }}
      >
        <Typography variant="h4">BRANDS</Typography>
        <Button onClick={() => handleOpen()} variant="contained">
          <AddCircleOutlineIcon />
        </Button>
      </Box>
      <BrandModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
      />
      {loading ? (
        <Loading />
      ) : brands.length === 0 ? (
        <NoDataMessage />
      ) : (
        <Grid container spacing={1}>
          {brands.map((brand) => (
            <BrandCard key={brand._id} brand={brand} handleOpen={handleOpen} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Brands;
