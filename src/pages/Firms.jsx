import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import useApiRequests from "../services/useApiRequests";
import { object, string } from "yup";
import { TextField } from "@mui/material";

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
  const { addFirm } = useApiRequests();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const firmSchema = object({
    firmName: string().required("Firma ismi zorunludur."),
    phone: string().required("Telefon numarası zorunludur."),
    address: string().required("Adres bilgisi zorunludur."),
    image: string().required("Firma görseli zorunludur."),
  });

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
          initialValues={{ firmName: "", phone: "", address: "", image: "" }}
          validationSchema={firmSchema}
          onSubmit={(values, actions) => {
            addFirm(values);
            actions.resetForm();
            actions.setSubmitting(false);
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
                  name="firmName"
                  id="firmName"
                  type="text"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.firmName}
                  onBlur={handleBlur}
                  error={touched.firmName && Boolean(errors.firmName)}
                  helperText={errors.firmName}
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
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Modal>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <IconButton aria-label="add to favorites">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Firm;
