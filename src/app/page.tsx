"use client";
import { Button, Stack } from "@mui/material";
import InputBox from "./components/inpuBox";
import SelectBox from "./components/selectBox";
import { Form, Formik } from "formik";
import { UserFormSchema } from "./schema/userSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const CreateData = useMutation({
    mutationFn: (values) =>
      fetch("/api/user/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }),
  });

  const submitHandler = async (values: any, actions: any) => {
    console.log("Values", values);
    CreateData.mutate(values, {
      onSuccess: () => {
        alert("Form Submitted Successfully...");
        actions.resetForm();
      },
      onError: () => {
        alert("Unable to submit form...");
      },
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          gender: "",
          password: "",
          confirmPassword: "",
          age: "",
        }}
        onSubmit={submitHandler}
        validationSchema={UserFormSchema}
      >
        {() => (
          <Form>
            <Stack
              direction={"column"}
              spacing={"4px"}
              justifyContent={"space-between"}
              className="mb-10"
              sx={{
                width: "300px",
                height: "450px",
                border: "black 1px solid",
                marginX: "auto",
                padding: "16px",
              }}
            >
              <InputBox nameType={"name"} inputLabel={"Name"} type={"text"} />
              <InputBox nameType={"email"} inputLabel={"Email"} type={"text"} />
              <InputBox nameType={"age"} inputLabel={"Age"} type={"number"} />
              <SelectBox nameType="gender" />
              <InputBox
                nameType={"password"}
                inputLabel={"Password"}
                type={"password"}
              />
              <InputBox
                nameType={"confirmPassword"}
                inputLabel={"Confirm Password"}
                type={"password"}
              />
              <Button type="submit">Submit</Button>
            </Stack>
          </Form>
        )}
      </Formik>

      <Button
        className="w-full mx-auto"
        onClick={() => router.push("/read-data")}
      >
        Read Data
      </Button>
    </>
  );
};

export default Page;
