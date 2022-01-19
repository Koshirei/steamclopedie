import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";


import "./Tableau.css";

interface DonneesTableau {
    appid: string,
    name: string;
    release_date: string;
    positive_ratings: string;
    background: string;
    header_image: string;
};

interface TableauProps {
    donnees: DonneesTableau[];
};

function Tableau(props: TableauProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [donnees, setDonnees] = useState<any[]>([])

    const [state, setState] = useState(0);

    useEffect(() => {
        let a: any = localStorage.getItem("display");
        setState(parseInt(a));
        choose(donnees);
        console.log(a);
        
        
    }, []);

    function renderTable(donnees: any) {
        donnees = donnees.map((value: any) => {    
            return (
                <tr>
                    <td><a href={"/jeux/" + value.appid}>{value.name}</a></td>
                    <td className="release_date">{value.release_date}</td>
                    <td className="positive_ratings">{value.positive_ratings}</td>
                    {/* <td><img src={value.header_image}></img></td> */}
                </tr>
            );
        });  

        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Release Date</th>
                        <th>Score</th>
                        {/* <th>img</th> */}
                    </tr>
                </thead>

                <tbody>
                    {donnees}
                </tbody>
            </table>
        );
    }

    function renderGrid(donnees: any) {
        donnees = donnees.map((value: any) => {    
            return (
                <a href={"/jeux/" + value.appid}><img src={value.header_image}></img></a>
            );
        });  

        return(
            <div id="grille">
            
                {donnees}
            </div>
        );
    }

    function toggleDisplay(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        
        if (state === 1) {
            localStorage.setItem("display", "0");
            setState(0);
            
        } else {
            localStorage.setItem("display", "1");

            setState(1);
            
        }
    }

    function choose(donnees: any) {
        
        if (state === 1) {
            
            return renderTable(donnees);
            
        } else {
            return renderGrid(donnees);
        }
    }
    
    

    return (
        <div id="table">
            <a id="toggle_display" href="#" onClick={toggleDisplay}>Toggle display</a>
            
            {choose(props.donnees)}
            
        </div>
    );
}

export default Tableau;