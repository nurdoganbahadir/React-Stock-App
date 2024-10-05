import * as React from "react";
import { useSelector } from "react-redux";
import useStockRequests from "../services/useStockRequests";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BrandCard from "../components/Brands/BrandCard";
import Typography from "@mui/material/Typography";
import { Grid, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const Brands = () => {
  const { brands } = useSelector((state) => state.stock);
  console.log(brands);
  const { getStock, postStock, deleteStock } = useStockRequests();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const firmSchema = object({
    name: string().required("Firma ismi zorunludur."),
    image: string().required("Firma görseli zorunludur."),
  });

  React.useEffect(() => {
    getStock("brands");
  }, []);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", my: "1.5rem" }}
      >
        <Typography variant="h4">BRANDS</Typography>
        <Button onClick={handleOpen} variant="contained">
          <AddCircleOutlineIcon />
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Formik
          initialValues={{ name: "", image: "" }}
          validationSchema={firmSchema}
          onSubmit={(values, actions) => {
            console.log(values);
            postStock("brands", values);
            actions.resetForm();
            actions.setSubmitting(false);
            handleClose();
          }}
        >
          {({
            isSubmitting,
            handleChange,
            values,
            touched,
            errors,
            handleBlur,
          }) => (
            <Form>
              <Box sx={style}>
                <TextField
                  label="Firma adı"
                  name="name"
                  id="name"
                  type="text"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={errors.name}
                />

                <TextField
                  label="Firma logosu"
                  name="image"
                  id="image"
                  type="text"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.image}
                  onBlur={handleBlur}
                  error={touched.image && Boolean(errors.image)}
                  helperText={errors.image}
                />
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ backgroundColor: "#023373" }}
                >
                  <CheckCircleIcon />
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Modal>
      <Grid container spacing={1}>
        {brands && brands.length > 0 ? (
          brands.map((brand) => <BrandCard brand={brand} />)
        ) : (
          <p>Veri yükleniyor veya firma bulunamadı.</p>
        )}
      </Grid>
    </>
  );
};

export default Brands;
