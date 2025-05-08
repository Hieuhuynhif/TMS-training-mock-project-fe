import { Container, Grid } from "@mui/material";
import React from "react";
import Header from "../_components/common/Header";
import SideBar from "../_components/common/SideBar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Grid container>
      <Grid size={12} height={"7vh"} borderBottom={"solid 1px #555"}>
        <Header />
      </Grid>

      <Grid size={12} container minHeight={"90vh"}>
        <Grid size={3} bgcolor={"#f5f5f5"} height={"100%"}>
          <SideBar />
        </Grid>
        <Grid size={9}>
          <Container sx={{ p: 4 }}>{children}</Container>
        </Grid>
      </Grid>

      <Grid size={12} height={"3vh"} bgcolor={"#f5f5f5"}></Grid>
    </Grid>
  );
}
