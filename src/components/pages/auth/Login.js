import react,{ useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { login, loginFacebook } from "../../../functions/auth";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login as LoginRedux } from "../../../store/userSlice";


// ====== LINE LOGIN ======
import liff from "@line/liff";

// ====== FACEBOOK LOGIN ======
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebook, FaLine } from "react-icons/fa";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID })
  }, []);

  const handleLoginline = () => {
    try{
      liff.login();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const form = {
      email: data.get("email"),
      password: data.get("password"),
    };

    login(form).then((response) => {
      alert(response.data);
      dispatch(LoginRedux({
        username: response.data.payload.user.username,
        email: response.data.payload.user.email,
        role: response.data.payload.user.role,
        token: response.data.token
      }));
      localStorage.setItem("token", response.data.token);
      roleRedirect(response.data.payload.user.role);
    }).catch((err) => {
      console.log(err);
    });
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin/index");
    } else {
      navigate("/user/index");
    }
  }

  const responseFacebook = async (response) => {
    console.log(response);
    await loginFacebook(response).then((res) => {
      alert(res.data);
      dispatch(LoginRedux({
        username: res.data.payload.user.username,
        email: res.data.payload.user.email,
        role: res.data.payload.user.role,
        token: res.data.token
      }));
      localStorage.setItem("token", res.data.token);
      roleRedirect(res.data.payload.user.role);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
            backgroundImage: "url(/assets/bgside.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={handleLoginline}
                startIcon={<FaLine />}
              >
                Sign In With Line
              </Button>

              <FacebookLogin
                appId="420377163732225"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={(renderProps) => (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    onClick={renderProps.onClick}
                    startIcon={<FaFacebook />}
                  >
                    Sign In With Facebook
                  </Button>
                )}
              />

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
