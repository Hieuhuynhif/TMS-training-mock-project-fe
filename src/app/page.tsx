import { Grid } from "@mui/material";
import Menu from "./_components/common/Menu";

export default function Home() {
  return (
    <Grid
      sx={{
        backgroundImage: 'url("images/background.jpg")',
      }}
      container
      height={"100vh"}
    >
      <Grid size={12} height={"7vh"}>
        <Menu />
      </Grid>
    </Grid>
  );
}
