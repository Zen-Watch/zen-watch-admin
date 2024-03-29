import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, getFirebaseErrorMessage } from "../../firebase-config";
import { useAppDispatch } from "../../app/hooks";
import { connect } from "../../features/appSlice";
import { STATUS_NOT_FOUND, UNAUTHORIZED_ACCESS } from "../../util/constants";
import { make_api_request } from "../../util/common_util.methods";

const registerSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

export default function Form() {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const colors = tokens(palette.mode);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const dispatch = useAppDispatch();

  const isDeveloperWhitelisted = async (email) => {
    const allow_signup_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/admin/allow_signup`;
    const payload = {
      email: email,
    };
    const result = make_api_request(allow_signup_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
      },
      body: JSON.stringify(payload),
    });
    return result;
  };

  const register = async (values, onSubmitProps) => {
    try {
      const result = await isDeveloperWhitelisted(values.email);
      if (result.status === UNAUTHORIZED_ACCESS) {
        alert(
          "Unauthorized access, please contact support!"
        );
        return;
      }
      else if (result.status === STATUS_NOT_FOUND) {
        alert(
          "Developer is not whitelisted. Please contact support for an invite."
        );
        return;
      }

      const savedUser = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      onSubmitProps.resetForm();
      if (savedUser) {
        setPageType("login");
      }
    } catch (error) {
      //TODO: Replace this with a good toast
      alert(getFirebaseErrorMessage(error.code));
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      onSubmitProps.resetForm();
      if (userCredentials) {
        dispatch(connect(userCredentials.user.email));
        navigate("/ifttt_instances");
      }
    } catch (error) {
      //TODO: Replace this with a good toast
      alert(getFirebaseErrorMessage(error.code));
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#1976d2",
                },  
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: colors.grey[100],
                "&:hover": {
                  cursor: "pointer",
                  color: colors.grey[100],
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
}
