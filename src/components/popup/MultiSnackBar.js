import React, { useCallback, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function SnackBar({snackBar,setSnackBar}) {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
      if (!snackBar.msg) return;

      enqueueSnackbar(snackBar.msg, {
        variant: snackBar.option || "default", // 'success', 'error', 'info', 'warning', 'default'
      });
    }, [snackBar]);

    return null;
  }
  
  export default function MultiSnackBar({ snackBar, setSnackBar }) {
    return (
      <SnackbarProvider maxSnack={3}>
        <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
      </SnackbarProvider>
    );
  }