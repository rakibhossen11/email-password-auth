import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/login"> Login</Link>
            <Link to="/register"> Register</Link>
            <Link to="/register-rbs"> RegisterRBS</Link>
        </div>
    );
};

export default Header;