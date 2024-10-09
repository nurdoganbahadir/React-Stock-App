import { Button, Container } from "@mui/material";
import { NoDataMessage, TableSkelthon } from "../components/Messages";
import { useSelector } from "react-redux";
import useStockRequests from "../services/useStockRequests";
import { useEffect, useState } from "react";
import SaleModal from "../components/Sales/SaleModal";
import SaleTable from "../components/Sales/SaleTable";

const Sales = () => {
  const { getStock  } = useStockRequests();
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
    <Container maxWidth="xl">
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        New Sale
      </Button>

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
    </Container>
  );
};

export default Sales;
