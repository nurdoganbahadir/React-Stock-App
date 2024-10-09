import useStockRequests from "../../services/useStockRequests";
import { useSelector } from "react-redux";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { butonStyle } from "../../style/globalStyles";
import Box from "@mui/material/Box";

const SaleTable = ({ handleOpen, setData }) => {
  const { deleteStock } = useStockRequests();
  const { sales } = useSelector((state) => state.stock);

  const getRowId = (row) => row._id;

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => new Date(row.createdAt).toLocaleString("de-DE"),
    },

    {
      field: "brandId",
      headerName: "Brand",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => row?.brandId?.name,
    },
    {
      field: "productId",
      headerName: "Product",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => row?.productId?.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 40,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { brandId, price, quantity, productId, _id } }) => {
        return [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleOpen();
              setData({ brandId, price, quantity, productId, _id });
            }}
            sx={butonStyle}
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStock("sales", _id)}
            sx={butonStyle}
          />,
        ];
      },
    },
  ];
  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <DataGrid
        rows={sales}
        columns={columns}
        pageSizeOptions={[20, 50, 75, 100]} //? sayfa basina satir sayisi
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        getRowId={getRowId}
      />
    </Box>
  );
};

export default SaleTable;
