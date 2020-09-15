import React, { Component } from "react";
import store from "../redux/store";
import { logOut } from "../redux";
import { connect } from "react-redux";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleLogout() {
    this.props.logOut();
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  
  }

  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              sawwit
            </NavbarBrand>
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              {this.props.user !== null ? (
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="#">
                      Post
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="#">
                      Account
                    </NavLink>
                  </NavItem>
                  <NavItem  onClick={this.handleLogout}>
                  <NavLink tag={Link} className="text-dark" to="#">
                      Logout
                    </NavLink>
                  </NavItem>
                </ul>
              ) : (
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/login">
                      Login
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/register">
                      Register
                    </NavLink>
                  </NavItem>
                </ul>
              )}
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

//THIS ALLOWS US TO USE THESE IN OUR COMPONENT
//Connects our component to redux
export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
