import { Box, Paper } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        padding: "15vh 30vw",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        sx={{
          height: "100%",
          bgcolor: "#fff",
          p: 3,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}

export default Layout;
