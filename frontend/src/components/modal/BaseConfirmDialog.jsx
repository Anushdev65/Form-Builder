import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import LoadingWrapper from "../LoadingWrapper";

const BaseConfirmDialog = (props) => {
  const {
    title = "Confirm Action!",
    open = false,
    onConfirm = () => {},
    onClose = () => {},
    children,
    loading = false,
    loadingText = "Confirming Action...",
    maxWidth = "sm",
    hideIcon = false,
    dialogIcon: DialogIcon = () => <WarningIcon />,
    ...otherProps
  } = props;

  return (
    <Dialog
      {...{ open, maxWidth, ...otherProps }}
      aria-labelledby="confirmation-dialog"
    >
      <LoadingWrapper {...{ loading, loadingText }}>
        <DialogTitle id="confirmation-dialog-title">
          <Box display="flex" alignItems="center" gap={1}>
            {!hideIcon && <DialogIcon />}

            <Typography variant="h6">{title}</Typography>
          </Box>
        </DialogTitle>

        <DialogContent dividers>{children}</DialogContent>

        <DialogActions>
          <Button autoFocus disabled={loading} onClick={onClose}>
            Cancel
          </Button>

          <Button
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </LoadingWrapper>
    </Dialog>
  );
};

export default BaseConfirmDialog;
