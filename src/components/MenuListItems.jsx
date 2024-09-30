import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppsIcon from "@mui/icons-material/Apps";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import StarsIcon from "@mui/icons-material/Stars";
import { useNavigate } from "react-router-dom";

const MenuListItems = () => {
  const navigate = useNavigate();

  const icons = [
    {
      title: "Dashboard",
      icon: <AppsIcon />,
      path: "/stock",
    },
    {
      title: "Purchases",
      icon: <ShoppingBasketIcon />,
      path: "/stock/purchases",
    },
    {
      title: "Sales",
      icon: <AttachMoneyIcon />,
      path: "/stock/sales/",
    },
    {
      title: "Firms",
      icon: <StoreIcon />,
      path: "/stock/firms/",
    },
    {
      title: "Brands",
      icon: <StarsIcon />,
      path: "/stock/brands/",
    },
    {
      title: "Products",
      icon: <InventoryIcon />,
      path: "/stock/products/",
    },
  ];

  return (
    <div>
      <List>
        {icons.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MenuListItems;
