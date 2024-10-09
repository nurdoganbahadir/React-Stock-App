import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export const TableSkelthon = () => {
  return (
    <Stack spacing={1} sx={{ mt: 3 }}>
      <Skeleton variant="rectangular" width="100%" height={90} />
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={30} />
    </Stack>
  );
};

export const CardSkeleton = ({ children }) => {
  return (
    <Stack spacing={1} sx={{ mt: 3 }} alignItems={"center"}>
      <Skeleton variant="rectangular">{children}</Skeleton>
    </Stack>
  );
};

export const NoDataMessage = () => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="warning">Gösterilecek veri yok</Alert>
    </Stack>
  );
};
const Messages = () => {
  return <div></div>;
};

export default Messages;
