import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import MUILoading from "../components/materialComponents/MUILoading";
import MUIToast from "../components/materialComponents/MUIToast";
import { useRegisterUserMutation } from "../apiSlice/user";
import SignInLogo from "../components/materialComponents/SignInLogo";
import SigninForm from "../components/auth/SignInForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  userName: "",
  email: "",
  password: "",
};

export default function RegisterUserPage() {
  const [registerUser, { isLoading, data, error, isSuccess }] =
    useRegisterUserMutation();
  const {
    handleBlur,
    touched,
    errors,
    handleChange,
    handleSubmit,
    values,
    resetForm,
  } = useFormik({
    initialValues,
    // validationSchema: userRegistrationSchema,
    onSubmit: (values) => {
      const body = {
        userName: values?.userName,
        email: values?.email,
        password: values?.password,
      };
      registerUser(body);
    },
  });

  const navigate = useNavigate();

  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (isSuccess) {
      resetForm();
      setFormKey((prevKey) => prevKey + 1);
      navigate("/login");
    }
  }, [isSuccess, resetForm, navigate]);

  return (
    <>
      {isLoading ? (
        <MUILoading />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <SignInLogo />
            <SigninForm
              key={formKey}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              values={values}
            />
          </Box>
        </Container>
      )}
      {data ? (
        <MUIToast
          initialValue={true}
          message={data.message}
          severity="success"
        />
      ) : error ? (
        <MUIToast
          initialValue={true}
          message={error.data.message}
          severity="error"
        />
      ) : (
        <></>
      )}
    </>
  );
}
