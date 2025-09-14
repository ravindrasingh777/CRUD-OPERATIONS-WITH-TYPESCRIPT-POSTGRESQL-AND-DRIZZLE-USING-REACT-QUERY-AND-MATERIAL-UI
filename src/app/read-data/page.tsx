"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../lib/userHelper"; // adjust path
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import AlertDialogSlide from "@/conponents/Dialog";
import DialogDeleteUser from "@/conponents/dialogDelete";

interface UserData {
  userId: string;
  name: string;
  gender: string;
  age: number;
  email: string;
}

const Page = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [value, setValue] = React.useState<null | UserData>(null);
  const [userId, setUserId] = React.useState<null | number | string>(null);

  const fetchData = async (): Promise<UserData[]> => {
    return await getUser();
  };

  const { data, isLoading, isError, error } = useQuery<UserData[], Error>({
    queryKey: ["users"],
    queryFn: fetchData,
    staleTime: Infinity,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      {open && <AlertDialogSlide value={value} open={open} setOpen={setOpen} />}
      {openDeleteDialog && (
        <DialogDeleteUser
          Id={userId}
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
        />
      )}
      <Stack direction={"column"} spacing={2} className="p-4">
        {data?.map((user) => (
          <Stack
            key={user.userId}
            spacing={1}
            className="bg-slate-100 shadow-md p-2"
          >
            <Typography>Id:{user.userId}</Typography>
            <Typography>Name:{user.name}</Typography>
            <Typography>Email:{user.email}</Typography>
            <Typography>Age:{user.age}</Typography>
            <Typography>Gender:{user.gender}</Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(true);
                  setValue(user);
                }}
                sx={{ padding: "2px", bgcolor: "green" }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenDeleteDialog(true);
                  setUserId(user.userId);
                }}
                sx={{ padding: "2px", bgcolor: "red" }}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        ))}
        <Button className="w-full mx-auto" onClick={() => router.push("/")}>
          Back
        </Button>
      </Stack>
    </>
  );
};

export default Page;
