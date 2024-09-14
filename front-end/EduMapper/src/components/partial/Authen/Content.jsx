import Stack from "@mui/material/Stack";

export default function Content({ src }) {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        width: "70%",
        maxWidth: "50rem",
      }}
    >
      <img src={src}></img>
    </Stack>
  );
}
