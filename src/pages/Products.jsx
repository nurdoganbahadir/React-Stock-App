import { Box, Button, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector } from "react-redux";
import useStockRequests from "../services/useStockRequests";
import { useEffect, useState } from "react";

import ProductTable from "../components/Products/ProductTable";
import ProductModal from "../components/Products/ProductModal";
import { NoDataMessage, TableSkelthon } from "../components/Messages";

const Products = () => {
  const { products, loading } = useSelector((state) => state.stock);
  const { getStock } = useStockRequests();

  const initialState = { categoryId: "", brandId: "", name: "" };
  const [data, setData] = useState(initialState);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setData(initialState);
  };

  useEffect(() => {
    getStock("products");
    getStock("categories");
    getStock("brands");
  }, []);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", my: "1.5rem" }}
      >
        <Typography variant="h4">PRODUCTS</Typography>
        <Button onClick={() => handleOpen()} variant="contained">
          <AddCircleOutlineIcon />
        </Button>
      </Box>
      <ProductModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
      />
      {loading && <TableSkelthon />}
      {!loading && !products.length && <NoDataMessage />}
      {!loading && products.length > 0 && <ProductTable />}
    </>
  );
};

export default Products;
