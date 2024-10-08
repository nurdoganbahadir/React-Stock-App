import React from "react";
import { useSelector } from "react-redux";
import useStockRequests from "../../services/useStockRequests";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";

const ProductTable = () => {
  const { deleteStock } = useStockRequests();
  const { products } = useSelector((state) => state.stock);

  const getRowId = (row) => row._id;

  const columns = [
    {
      field: "_id",
      headerName: "#",
      flex: 1,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "categoryId",
      headerName: "Categories",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (value) => value?.name,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "brandId",
      headerName: "Brands",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (value) => value?.name,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "name",
      headerName: "Name",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "quantity",
      headerName: "Stock",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Operations",
      getActions: (props) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => deleteStock("products", props.id)}
            label="Delete"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <DataGrid
        rows={products}
        columns={columns}
        disableRowSelectionOnClick
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

export default ProductTable;
