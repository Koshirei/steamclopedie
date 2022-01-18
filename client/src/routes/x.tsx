import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function Recherche() {
    const [donnees, setDonnees] = useState<any[]>([]);
    let [searchParams, setSearchParams] = useSearchParams();
    let page: any = searchParams.get("page");

    const [ademande, setDemande] = useState("");

    let demande: any = searchParams.get("demande");
    

    useEffect(() => {
        if (demande != null) {
            recherche(demande);
        }
    }, []);

    function recherche(demande: any) {
        setDemande(demande);

        const requete = async () => {
            let res = await fetch(`http://localhost:3001/api/recherche?page=${page}&demande=${demande}`, {
                mode: "cors",
                method: "GET",

            });

            let json = await res.json();

            setDonnees(json);
            console.log(await json);
        };

        requete().catch((err) => {
            console.log(err);

        });
    }

    let res = donnees.map((value) => {
        return <a href={"http://localhost:3000/jeux/" + value.appid}>{value.name}</a>
    });

    return (
        <>
            <form>
                <input type="text" placeholder="recherche" onKeyUp={(e: any) => { recherche(e.target.value) }}></input>

            </form>

            <div id="resultat">
                {res}

                <a href={"http://localhost:3000/recherche?page=" + (page - 1) + "&demande=" + ademande}>page precedente</a>
                <a href={"http://localhost:3000/recherche?page=" + (parseInt(page) + 1) + "&demande=" + ademande}>page suivante</a>
            </div>
        </>

    );
}

export default Recherche;