import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import GridViewIcon from "@mui/icons-material/GridView";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const MenuListItems = () => {
  const icons = [
    {
      title: "Dashboard",
      icon: <GridViewIcon />,
      path: "/",
    },
    {
      title: "Purchases",
      icon: <ShoppingBasketIcon />,
      path: "/purchases",
    },
  ];

  return (
    <div>
      <List>
        {icons.map((icon, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon.icon}</ListItemIcon>
              <ListItemText primary={icon.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MenuListItems;
