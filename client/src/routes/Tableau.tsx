import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";


import "./Tableaux.css";

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
                    <td>{value.release_date}</td>
                    <td>{value.positive_ratings}</td>
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
                <img src={value.header_image}></img>
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
        <>
            <a href="#" onClick={toggleDisplay}>Toggle display</a>
            
            {choose(props.donnees)}
            
        </>
    );
}

export default Tableau;