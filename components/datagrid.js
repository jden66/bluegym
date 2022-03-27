import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "num",
    headerName: "번호",
    width: 70,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "운동 이름",
    width: 300,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "category",
    headerName: "운동 분류",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
];

/**
 * 나쁘지 않다..
 * @param {*} param0
 * @returns
 */

export default function DataTable({ data, loading }) {
  const rowData = data?.map((d, num) => ({ ...d, num, id: d.seq })) || [];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        density="compact"
        loading={loading}
        rows={rowData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        // checkboxSelection
      />
    </div>
  );
}
