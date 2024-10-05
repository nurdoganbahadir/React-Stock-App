import { Box } from "@mui/material";
import LoadingGif from "../assets/loading.gif";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "60vh",
      }}
    >
      <img src={LoadingGif} style={{ width: "200px" }} />
    </Box>
  );
};

export default Loading;
