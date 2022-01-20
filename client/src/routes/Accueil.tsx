import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Recherche from "../components/Recherche";
import Tableau from "../components/Tableau";

import "./Accueil.css";

function Accueil() {
    const [donnees, setDonnees] = useState<any[]>([]);

    function update(data: any[]): void {
        setDonnees(data);
    }

    return (
        <>
            <Navbar />
            <div id="homepage_header">
                <h1>Welcome to Steamclopedia!</h1>
                <h4>The only website you'll ever need to find informations about your favorite games!</h4>
                <h5>Browse throught more than 25,000 games with our advanced searching tool!</h5>
            </div>
            <div className="container">
                <Recherche resultat={update}/>

                <Tableau donnees={donnees} />
            </div>
        </>
    );
}

export default Accueil;