import { Stack } from "@mui/material";
import HeaderDetails from "./HeaderDetails";
import SessionProviderWrap from "./SessionProviderWrap";

export function Header() {
  return (
    <Stack
      direction={"row"}
      height={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <SessionProviderWrap>
        <HeaderDetails />
      </SessionProviderWrap>
    </Stack>
  );
}

export default Header;
