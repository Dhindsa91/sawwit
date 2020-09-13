import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { login } from "../api/user";
import { connect } from "react-redux";
import { setUser } from "../redux";
import store from "../redux/store";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();

    login(this.state.email, this.state.password).then((response) => {
      console.log(response);
      if (response.data.ok === false) {
        if (response.data && response.data.error) console.log(response.data);
        this.setState({ errorMessage: response.data.error });
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        store.dispatch(setUser(response.data));
        this.props.history.push("/");
      }
    });
  }

  //  mapDispatchToProps = dispatch => {
  //   return {
  //     setUser: () => dispatch(setUser())
  //   }
  // }

  render() {
    return (
      <div className="form-container">
        <Container className="form" component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography className="title" component="h1" variant="h5">
              Sign in
            </Typography>
            <form className="login-form">
              <TextField
                onChange={this.handleChange}
                variant="outlined"
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
                onChange={this.handleChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Box item className="error-message">
                <small>
                  <p id="error-msg">{this.state.errorMessage}</p>
                </small>
              </Box>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Sign In
              </Button>
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
            </form>
          </div>
          <Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="#">
                sawwit
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Container>
      </div>
    );
  }
}
