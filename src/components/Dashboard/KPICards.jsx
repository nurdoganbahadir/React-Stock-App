import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PaymentsIcon from "@mui/icons-material/Payments";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { blue, pink, green } from "@mui/material/colors";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const KPICards = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const totalSales = sales.reduce((acc, sale) => acc + sale.amount, 0);
  const totalPurchases = purchases.reduce(
    (acc, purchase) => acc + purchase.amount,
    0
  );

  const cardData = [
    {
      id: 1,
      icon: <MonetizationOnIcon sx={{ fontSize: "1.8rem" }} />,
      title: "sales",
      bgColor: green[100],
      color: green[900],
      amount: "$" + totalSales.toLocaleString("tr-TR"),
    },
    {
      id: 2,
      icon: <ShoppingBasketIcon sx={{ fontSize: "1.8rem" }} />,
      title: "profit",
      bgColor: pink[100],
      color: pink[800],
      amount: "$" + (totalSales - totalPurchases).toLocaleString("tr-TR"),
    },
    {
      id: 3,
      icon: <PaymentsIcon sx={{ fontSize: "1.8rem" }} />,
      title: "purchases",
      bgColor: blue[100],
      color: blue[900],
      amount: "$" + totalPurchases.toLocaleString("tr-TR"),
    },
  ];
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"row"}
      flexWrap={"wrap"}
      gap={2}
    >
      {cardData.map((item) => (
        <Paper
          key={item.id}
          elevation={5}
          sx={{
            display: "flex",
            width: 275,
            p: 1,
            gap: 3,
          }}
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
              backgroundColor: item.bgColor,
              color: item.color,
              ml: 3,
            }}
          >
            {item.icon}
          </Avatar>
          <Box>
            <Typography variant="button">{item.title}</Typography>
            <Typography variant="h5">{item.amount}</Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
};

export default KPICards;
