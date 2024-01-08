import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {FaEdit, FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {logout, reset} from "../../features/auth/authSlice";
import {toast} from "react-toastify";

const Header = () => {

    return (
        <header className='mainHeader'>
            <Link className="logo" to='/'>Stock Wiz</Link>
        </header>
    );
};

export default Header;