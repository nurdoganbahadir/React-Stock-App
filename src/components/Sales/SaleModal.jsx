import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalStyle } from "../../style/globalStyles";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useStockRequests from "../../services/useStockRequests";

export default function SaleModal({ open, handleClose, data, setData }) {
  const navigate = useNavigate();
  const { postStock, putStock } = useStockRequests();
  const { products, brands } = useSelector((state) => state.stock);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data._id) {
      putStock("sales", data);
    } else {
      postStock("sales", data);
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component="form"
            onSubmit={handleSubmit}
          >
            <FormControl>
              <InputLabel variant="outlined" id="brand-select-label">
                Brand
              </InputLabel>
              <Select
                labelId="brand-select-label"
                label="Brand"
                id="brand-select"
                name="brandId"
                value={data?.brandId?._id || data?.brandId}
                onChange={handleChange}
                required
              >
                <MenuItem onClick={() => navigate("/stock/brands/")}>
                  Add New Brand
                </MenuItem>
                <hr />
                {brands?.map((item) => {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel variant="outlined" id="product-select-label">
                Product
              </InputLabel>
              <Select
                labelId="product-select-label"
                label="Product"
                id="product-select"
                name="productId"
                value={data?.productId?._id || data?.productId}
                onChange={handleChange}
                required
              >
                <MenuItem onClick={() => navigate("/stock/products")}>
                  Add New Product
                </MenuItem>
                <hr />
                {products?.map((item) => {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              label="Quantity"
              id="quantity"
              name="quantity"
              type="number"
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
              value={data?.quantity}
              onChange={handleChange}
              required
            />
            <TextField
              label="Price"
              id="price"
              type="number"
              variant="outlined"
              name="price"
              InputProps={{ inputProps: { min: 0 } }}
              value={data?.price}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" size="large">
              {data?._id ? "Update Sale" : "Add New Sale"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
