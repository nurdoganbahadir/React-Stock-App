import { useEffect, useState } from "react";
import useStockRequests from "../services/useStockRequests";
import { Button, Container } from "@mui/material";
import { TableSkelthon, NoDataMessage } from "../components/Messages";
import { useSelector } from "react-redux";
import PurchaseModal from "../components/Purchases/PurchaseModal";
import PurchaseTable from "../components/Purchases/PurchaseTable";

const Purchases = () => {
  const { getStock } = useStockRequests();
  const { loading, purchases } = useSelector((state) => state.stock);

  const [open, setOpen] = useState(false);

  const initialState = {
    brandId: "",
    firmId: "",
    productId: "",
    quantity: "",
    price: "",
  };

  const [data, setData] = useState(initialState);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setData(initialState);
  };

  useEffect(() => {
    getStock("products");
    getStock("purchases");
    getStock("brands");
    getStock("firms");
  }, []);

  return (
    <Container maxWidth="xl">
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        New Purchase
      </Button>

      {loading && <TableSkelthon />}
      {!loading && !purchases?.length && <NoDataMessage />}
      {!loading && purchases?.length > 0 && (
        <PurchaseTable setData={setData} handleOpen={handleOpen} />
      )}

      <PurchaseModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
      />
    </Container>
  );
};

export default Purchases;
