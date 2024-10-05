import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import useStockRequests from "../../services/useStockRequests";

const BrandCard = ({ brand }) => {
  const { deleteStock } = useStockRequests();

  return (
    <Grid item xs={6} md={4} xl={2} key={brand._id}>
      <Card>
        <CardMedia
          component="img"
          sx={{
            height: "150px",
            objectFit: "contain",
            padding: "20px",
          }}
          image={brand.image}
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
  );
};

export default BrandCard;
