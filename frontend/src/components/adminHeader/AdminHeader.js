import React from 'react';
import {Link} from "react-router-dom";

const AdminHeader = () => {
    return (
        <>
            <header className="adminHeader">
                <h1><Link to="/admin">Stock Wizz</Link></h1>
                <ul>
                    <li><Link to="/produits">Produits</Link></li>
                    <li><Link to="/membres">Membres</Link></li>
                    <li><Link to="/rapports">Rapports</Link></li>
                </ul>
            </header>
        </>
    );
};

export default AdminHeader;