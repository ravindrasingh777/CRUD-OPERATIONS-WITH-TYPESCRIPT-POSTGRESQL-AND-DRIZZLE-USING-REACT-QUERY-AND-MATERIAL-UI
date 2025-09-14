import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import React from "react";

const SelectBox = ({ nameType }: any) => {
  const [field, meta] = useField(nameType);
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select {...field} labelId="gender-label" id="gender" label="Gender">
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        <Typography sx={{ color: "red", fontSize: "12px" }}>
          {meta.touched && meta.error}
        </Typography>
      </FormControl>
    </>
  );
};

export default SelectBox;
