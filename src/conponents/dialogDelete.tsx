import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteUser } from "../../lib/userHelper";

export default function DialogDeleteUser({ Id, setOpen, open }: any) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = useMutation({
    mutationFn: async (Id: any) => {
      return await DeleteUser(Id);
    },
    onSuccess: () => {
      alert(`User Deleted Successfully..`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      alert("Unable to delete user...");
    },
  });

  const deleteHandler = () => {
    deleteUser.mutate(Id);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure For Delete User ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once You Delete User, You won't back User again so make sure for
            delete user...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={handleClose}>
            Disagree
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={deleteHandler}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
