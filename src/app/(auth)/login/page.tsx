import SessionProviderWrap from "@/app/_components/common/SessionProviderWrap";
import { Box, Typography } from "@mui/material";
import LoginForm from "../../_components/forms/LoginForm";

function login() {
  return (
    <Box>
      <Typography variant="caption" fontSize={"2rem"}>
        Log in to your Account
      </Typography>
      <Box mt={3}>
        <SessionProviderWrap>
          <LoginForm />
        </SessionProviderWrap>
      </Box>
    </Box>
  );
}

export default login;
