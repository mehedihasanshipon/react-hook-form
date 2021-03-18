import React, { useContext } from 'react';
import { Navbar ,Nav} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <div className="container">
                    <NavLink className="navbar-brand" to='/home'>Home</NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                        <NavLink className="nav-link" to='/home'>Home</NavLink>
                        <NavLink className="nav-link" to='/login'>Login</NavLink>
                        <NavLink className="nav-link" to='/private'>Private route</NavLink>
                        <button onClick={()=>setLoggedInUser({})} className="btn btn-primary">Sign out</button>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    );
};

export default Header;