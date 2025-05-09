import { Alert, AlertProps, Snackbar } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  message: string;
  type: AlertProps["severity"];
};

function CustomNotification({ open, onClose, message, type }: Props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={onClose}
      message={message}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
}

export default CustomNotification;
