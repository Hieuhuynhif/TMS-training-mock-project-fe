import { Container, Grid } from "@mui/material";
import React from "react";
import Header from "../_components/common/Header";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <Grid container>
      <Grid size={12} height={"7vh"} borderBottom={"solid 1px #555"}>
        <Header />
      </Grid>
      <Grid size={12}>
        <Container sx={{ p: 4, minHeight: "90vh" }}>{children}</Container>
      </Grid>
      <Grid size={12} height={"3vh"} bgcolor={"#f5f5f5"}></Grid>
    </Grid>
  );
}
