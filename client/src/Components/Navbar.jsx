import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import logo from "../Images/Website.png";
import '../Style/Navbar.css';

const Header = ({ signedIn }) => {

    const [click, setClick] = useState(false);

    const toggleClick = () => setClick(!click);

    const signed = () => {
        if(!signedIn) {
            return (
                <>
                    <NavItem>
                        <NavLink exact to="/signin" activeClassName="active" className="nav-links" onClick={toggleClick}>Sign In</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink exact to="/signup" activeClassName="active" className="nav-links" onClick={toggleClick}>Sign Up</NavLink>
                    </NavItem>
                </>
            )
        } else {
            return (
                <NavItem>
                    <NavLink exact to="/signout" activeClassName="active" className="nav-links" onClick={toggleClick}>Sign Out</NavLink>
                </NavItem>
            )
        }
    }

    return (
        <Navbar color='dark' dark expand='lg'>
            <a className="navbar-brand" href='/'>
                <img src={logo} alt="Questiva" />
            </a>
            <Collapse isOpen={click} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink exact to="/find" activeClassName="active" className="nav-links" onClick={toggleClick}>Connect</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink exact to="/about" activeClassName="active" className="nav-links" onClick={toggleClick}>About</NavLink>
                    </NavItem>

                    {signed()}
                </Nav>

                <div className="nav-icon" onClick={toggleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}>
                        <MenuIcon style={{ fontSize: '30px', marginTop: '3px' }} />
                    </i>
                </div>
            </Collapse>
        </Navbar>
    )
}

export default Header;