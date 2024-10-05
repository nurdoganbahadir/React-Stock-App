import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import useStockRequests from "../../services/useStockRequests";
import Button from "@mui/material/Button";
import { useEffect } from "react";

const BrandModal = ({ open, data, setData, handleClose }) => {
  const { postStock, updateStock } = useStockRequests();

  const firmSchema = object({
    name: string().required("Firma ismi zorunludur."),
    image: string().required("Firma görseli zorunludur."),
  });

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

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Formik
        initialValues={data || { name: "", image: "" }}
        validationSchema={firmSchema}
        onSubmit={(values, actions) => {
          if (data && data._id) {
            updateStock("brands", values, data._id);
          } else {
            postStock("brands", values);
          }
          setData(null);
          actions.resetForm();
          actions.setSubmitting(false);
          handleClose();
        }}
        enableReinitialize
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
  );
};

export default BrandModal;
