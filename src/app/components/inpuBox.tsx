import { TextField, Typography } from "@mui/material";
import { useField } from "formik";
import React from "react";

type InputProps = {
  inputLabel: string;
  type: string;
  nameType: string;
};

const InputBox = ({ inputLabel, type, nameType }: InputProps) => {
  const [field, meta] = useField(nameType);
  return (
    <>
      <TextField
        id="standard-basic"
        {...field}
        name={nameType}
        label={inputLabel}
        type={type}
        variant="outlined"
      />
      <Typography sx={{ color: "red", fontSize: "12px" }}>
        {meta.touched && meta.error}
      </Typography>
    </>
  );
};

export default InputBox;
