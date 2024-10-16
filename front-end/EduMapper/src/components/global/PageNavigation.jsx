import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export default function PageNavigation(pros) {
  const { page, setPage, totalPages } = pros;
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <li>
      <Stack
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </li>
  );
}