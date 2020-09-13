import React from "react";
import "./Form.css";
import { createAccount } from "../api/user";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import store from "../redux/store";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(store.getState().user);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ errorMessage: "" });
    console.log(this.state.password);
    //Check: no empty fields & passwords match
    //if(!this.state.firstname || !this.state.lastname || !this.state.email || !this.state.username || !this.state.password || !this.state.confirmPassword) return this.setState({errorMessage: 'Please complete all fields.'})
    if (this.state.password !== this.state.confirmPassword)
      return this.setState({ errorMessage: "Passwords do not match." });

    createAccount(
      this.state.firstname,
      this.state.lastname,
      this.state.email,
      this.state.username,
      this.state.password
    )
      .then((response) => {
        if (response.data.ok === false) {
          if (response.data && response.data.error) console.log(response.data);
          response.data.error
            ? this.setState({
                errorMessage: "An error has occured, please try again later.",
              })
            : this.setState({
                errorMessage: "An error has occured, please try again later.",
              });
        } else {
          this.props.history.push("/");
        }
      })
      .catch((err) => this.setState({ errorMessage: err.message }));
  }
  render() {
    return (
      <div className="form-container">
        <Container className="form" component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar className="avatar">
              <LockOpenIcon />
            </Avatar>
            <Typography
              id="heading"
              className="title"
              component="h1"
              variant="h5"
            >
              Register
            </Typography>
            <form className="register">
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={this.state.firstname}
                    onChange={this.handleChange}
                    autoComplete="fname"
                    name="firstname"
                    variant="outlined"
                    required
                    fullWidth
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={this.state.lastname}
                    onChange={this.handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastname"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={this.state.email}
                    onChange={this.handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={this.state.username}
                    onChange={this.handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={this.state.password}
                    onChange={this.handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirm-password"
                  />
                </Grid>
                <Grid item className="error-message" xs={12}>
                  <small>
                    <p id="error-msg">{this.state.errorMessage}</p>
                  </small>
                </Grid>
                <Grid item xs={12} className="mt-2">
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I Agree to the Terms & Conditions"
                  />
                </Grid>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item>
                  <Button
                    onClick={this.handleSubmit}
                    variant="contained"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
              <Grid className="login-redirect" container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={3} mb={0}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              sawwit
              {" " + new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Container>
      </div>
    );
  }
}
