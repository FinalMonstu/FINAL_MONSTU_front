import React, { useCallback, useEffect, useState } from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';

function SnackBar({snackBar,setSnackBar}) {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
      if (!snackBar.msg) return;
      enqueueSnackbar(snackBar.msg, {
        variant: snackBar.option || "default",
      });
      setSnackBar({ msg: "", option: "" });
    }, [snackBar, enqueueSnackbar, setSnackBar]);

    return null;
  }
  
  export default function MultiSnackBar({ snackBar, setSnackBar }) {
    return (
      <SnackbarProvider maxSnack={3}>
        <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
      </SnackbarProvider>
    );
  }