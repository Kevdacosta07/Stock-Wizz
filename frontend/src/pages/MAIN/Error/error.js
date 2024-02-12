import React from 'react';
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <>
            <div className="error">
                <h1>Erreur 404</h1>

                <p>Page introuvable</p>

                <div>
                    <Link to='/'>Retourner à la page d'accueil</Link>
                </div>
            </div>
        </>

    );
};

export default Error;