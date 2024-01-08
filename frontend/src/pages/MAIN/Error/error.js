import React from 'react';
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <>
            <h1 style={{ fontSize: "3em", margin: "0", lineHeight: "0.8em"}}>
                Erreur 404
            </h1>

            <p style={{ fontSize: "1.5em"}}>
                Page introuvable
            </p>

            <div style={{margin: "30px 0"}}>
                <Link to='/' style={{backgroundColor: "blue", padding: "10px 20px", borderRadius: "20px", color: "white", fontSize: "1.3em"}}>Retourner à la page d'accueil</Link>
            </div>
        </>

    );
};

export default Error;