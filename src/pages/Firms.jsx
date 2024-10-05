import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import useStockRequests from "../services/useStockRequests";
import { useEffect } from "react";
import FirmCard from "../components/Firms/FirmCard";

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

const Firm = () => {
  const { firms } = useSelector((state) => state.stock);
  const { getStock, postStock } = useStockRequests();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const firmSchema = object({
    name: string().required("Firma ismi zorunludur."),
    phone: string().required("Telefon numarası zorunludur."),
    address: string().required("Adres bilgisi zorunludur."),
    image: string().required("Firma görseli zorunludur."),
  });

  useEffect(() => {
    getStock("firms");
  }, [firms]);

  return (
    <>
      <h1>FIRMS</h1>
      <Button onClick={handleOpen} variant="contained">
        <AddCircleOutlineIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Formik
          initialValues={{ name: "", phone: "", address: "", image: "" }}
          validationSchema={firmSchema}
          onSubmit={(values, actions) => {
            postStock("firms", values);
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
                  label="Telefon numarası"
                  name="phone"
                  id="phone"
                  type="text"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.phone}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={errors.phone}
                />
                <TextField
                  label="Adres"
                  name="address"
                  id="address"
                  type="text"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.address}
                  onBlur={handleBlur}
                  error={touched.address && Boolean(errors.address)}
                  helperText={errors.address}
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
