import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useStockRequests from "../../services/useStockRequests";
import { Grid } from "@mui/material";

const FirmCard = ({ firm }) => {
  const { deleteStock } = useStockRequests();
  return (
    <Grid item xs={6} md={4} xl={2} key={firm._id}>
      <Card>
        <CardHeader
          sx={{ height: "150px" }}
          title={firm.name}
          subheader={firm.address}
        />
        <CardMedia
          component="img"
          height="195"
          image={firm.image}
          alt={firm.name}
          sx={{
            width: "100%",
            height: "150px",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <IconButton
            aria-label="delete"
            onClick={() => deleteStock("firms", firm._id)}
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

export default FirmCard;
