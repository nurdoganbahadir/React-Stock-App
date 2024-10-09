import { useSelector } from "react-redux";
import useStockRequests from "../../services/useStockRequests";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { butonStyle } from "../../style/globalStyles";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const PurchaseTable = ({ setData, handleOpen }) => {
  const { purchases } = useSelector((state) => state.stock);
  const { deleteStock } = useStockRequests();

  const getRowId = (row) => row._id;

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }) => {
        return new Date(row.createdAt).toLocaleString("de-DE");
      },
    },
    {
      field: "firmId",
      headerName: "Firm",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }) => row?.firmId?.name,
    },
    {
      field: "brandId",
      headerName: "Brand",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }) => row?.brandId?.name,
    },
    {
      field: "productID",
      headerName: "Product",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row }) => row?.productId?.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "amount",
      headerName: "Amount",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({
        row: { brandId, productId, quantity, price, firmId, _id },
      }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleOpen();
              setData({ _id, brandId, productId, quantity, price, firmId });
            }}
            sx={butonStyle}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStock("purchases", _id)}
            sx={butonStyle}
          />,
        ];
      },
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <DataGrid
        rows={purchases}
        columns={columns}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        getRowId={getRowId}
        sx={{
          "& .custom-header, & .custom-cell": {
            fontSize: "1rem",
            "@media (max-width: 600px)": {
              fontSize: "0.8rem",
            },
          },
        }}
      />
    </Box>
  );
};

export default PurchaseTable;
