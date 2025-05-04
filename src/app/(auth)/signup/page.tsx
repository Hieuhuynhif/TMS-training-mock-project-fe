import { Box, Typography } from "@mui/material";
import SignupForm from "../../_components/forms/SignupForm";

function signup() {
  return (
    <Box>
      <Typography variant="caption" fontSize={"2rem"}>
        Create new Account
      </Typography>
      <Box mt={3}>
        <SignupForm />
      </Box>
    </Box>
  );
}

export default signup;
