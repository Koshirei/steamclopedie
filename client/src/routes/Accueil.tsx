import React, { useEffect, useState } from "react";

import Recherche from "./Recherche";
import Tableau from "./Tableau";

function Accueil() {
    const [donnees, setDonnees] = useState<any[]>([]);

    function update(data: any[]): void {
        console.log(data);

        setDonnees(data);
    }

    return (
        <>
            <Recherche resultat={update}/>

            <Tableau donnees={donnees} />
        </>
    );
}

export default Accueil;