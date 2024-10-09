import { Box, Button, Container, Typography } from "@mui/material";
import { NoDataMessage, TableSkelthon } from "../components/Messages";
import { useSelector } from "react-redux";
import useStockRequests from "../services/useStockRequests";
import { useEffect, useState } from "react";
import SaleModal from "../components/Sales/SaleModal";
import SaleTable from "../components/Sales/SaleTable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Sales = () => {
  const { getStock } = useStockRequests();
  const { sales, loading } = useSelector((state) => state.stock);

  const [open, setOpen] = useState(false);

  const initialState = { brandId: "", productId: "", quantity: "", price: "" };
  const [data, setData] = useState(initialState);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setData(initialState);
  };

  useEffect(() => {
    getStock("products");
    getStock("sales");
    getStock("brands");
  }, []);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", my: "1.5rem" }}
      >
        <Typography variant="h4">SALES</Typography>
        <Button onClick={handleOpen} sx={{ mb: 2 }} variant="contained">
          <AddCircleOutlineIcon />
        </Button>
      </Box>

      {loading && <TableSkelthon />}
      {!loading && !sales?.length && <NoDataMessage />}

      {!loading && sales?.length > 0 && (
        <SaleTable setData={setData} handleOpen={handleOpen} />
      )}

      <SaleModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
      />
    </>
  );
};

export default Sales;
