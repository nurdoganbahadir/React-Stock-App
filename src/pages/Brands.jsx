import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import useStockRequests from "../services/useStockRequests";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
      <h1>Brands</h1>
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
          initialValues={{ name: "", image: "" }}
          validationSchema={firmSchema}
          onSubmit={(values, actions) => {
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
          brands.map((brand) => (
            <Grid item xs={6} md={4} xl={2} key={brand._id}>
              <Card>
                <CardMedia
                  sx={{ height: 140 }}
                  image={brand.image}
                  title="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ textAlign: "center" }}
                    variant="h5"
                    component="div"
                  >
                    {brand.name}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteStock("brands", brand._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <p>Veri yükleniyor veya firma bulunamadı.</p>
        )}
      </Grid>
    </>
  );
};

export default Brands;
