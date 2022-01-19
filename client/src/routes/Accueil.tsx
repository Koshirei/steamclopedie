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

            <div className="container">
                <Recherche resultat={update}/>

                <Tableau donnees={donnees} />
            </div>
        </>
    );
}

export default Accueil;