import MUIError from "../materialComponents/MUIError";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../../styles/signup.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SigninForm = ({
  handleBlur,
  touched,
  errors,
  handleChange,
  handleSubmit,
  values,
  updateProfile,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={Boolean(touched.name && errors.name)}
                autoComplete="off"
                name="userName"
                required
                id="userName"
                label="userName"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
              />
              <MUIError
                touch={touched.userName}
                error={errors.userName}
                value={false}
              />
            </Grid>
            {!updateProfile && (
              <Grid item xs={12}>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fontSize="small"
                />
                <MUIError
                  touch={touched.email}
                  error={errors.email}
                  value={false}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                error={Boolean(touched.password && errors.password)}
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="off"
                type={showPassword ? "text" : "password"} // Toggle between text and password based on state
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  // Add end adornment for the text field
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText="Password must have at least one uppercase letter, one numeric digit, and one special character."
              />
              <MUIError
                touch={touched.password}
                error={errors.password}
                value={false}
              />
            </Grid>
            {/* <Grid item xs={12}>
                <DatePicker
                  error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                  required
                  fullWidth
                  id="dateOfBirth"
                  label="Date of Birth"
                  name="dateofBirth"
                  autoComplete="off"
                  value={values.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fontSize="small"
                />
                <MUIError
                  touch={touched.dateOfBirth}
                  error={errors.dateOfBirth}
                  value={false}
                />
              </Grid> */}
          </Grid>
          <Button
            id="button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {updateProfile ? "Update" : "Register"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SigninForm;
