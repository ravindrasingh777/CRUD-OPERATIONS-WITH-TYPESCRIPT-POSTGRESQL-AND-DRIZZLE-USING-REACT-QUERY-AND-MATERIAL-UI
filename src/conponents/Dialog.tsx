import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Form, Formik } from "formik";
import { UserFormSchema } from "@/app/schema/userSchema";
import { Stack } from "@mui/material";
import InputBox from "@/app/components/inpuBox";
import SelectBox from "@/app/components/selectBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditUser } from "../../lib/userHelper";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, value }: any) {
  const queryClient = useQueryClient();

  const editUser = useMutation({
    mutationFn: async (values: any) => {
      return await EditUser(values);
    },
    onSuccess: () => {
      alert(`User Details Successfully Updated `);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      alert("Unable TO update user");
    },
  });

  const submitHandler = async (values: any, actions: any) => {
    editUser.mutate(values);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit User Form"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={value}
            onSubmit={submitHandler}
            validationSchema={UserFormSchema}
          >
            {() => (
              <Form>
                <Stack
                  direction="column"
                  spacing="4px"
                  justifyContent="space-between"
                  className="mb-10"
                  sx={{
                    width: "400px",
                    height: "450px",
                    marginX: "auto",
                    padding: "16px",
                  }}
                >
                  <InputBox nameType="name" inputLabel="Name" type="text" />
                  <InputBox nameType="email" inputLabel="Email" type="text" />
                  <InputBox nameType="age" inputLabel="Age" type="number" />
                  <SelectBox nameType="gender" />
                  <InputBox
                    nameType="password"
                    inputLabel="Password"
                    type="password"
                  />
                  <InputBox
                    nameType="confirmPassword"
                    inputLabel="Confirm Password"
                    type="password"
                  />

                  <DialogActions>
                    <Stack
                      width="100%"
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                      <Button type="submit" variant="outlined" color="primary">
                        Submit
                      </Button>
                    </Stack>
                  </DialogActions>
                </Stack>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
