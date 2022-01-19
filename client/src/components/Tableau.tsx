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


    const [page, setPage]: any = useState(1);
    const [name, setName]: any = useState("");
    const [release_date, setReleaseDate]: any = useState("");
    const [developer, setDeveloper]: any = useState("");
    const [publisher, setPublisher]: any = useState("");
    const [platforms, setPlatforms]: any = useState("");
    const [required_age, setRequiredAge]: any = useState("");
    const [genres, setGenres]: any = useState("");
    const [categories, setCategories]: any = useState("");
    const [users_tags, setUsersTags]: any = useState("");
    const [positive_reviews, setPositiveReviews]: any = useState("");

    useEffect(() => {
        let a: any = localStorage.getItem("display");
        setState(parseInt(a));
        choose(donnees);
  
        if (searchParams.get("page")! === null) {
            setPage("1");
        
        } else {
            setPage(searchParams.get("page"));
           
        }

        setName(searchParams.get("name"));
        setReleaseDate(searchParams.get("release_date"));
        setPublisher(searchParams.get("publisher"));
        setDeveloper(searchParams.get("developers"));
        setPlatforms(searchParams.get("platforms"));
        setRequiredAge(searchParams.get("required_age"));
        setCategories(searchParams.get("categories"));
        setGenres(searchParams.get("genres"));
        setUsersTags(searchParams.get("uesrs_tags"));
        setPositiveReviews(searchParams.get("positive_reviews"));
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
            <div id="menu">
                <a id="toggle_display" href="#" onClick={toggleDisplay}>Toggle display</a>
                <a href={`/?page=${parseInt(page) - 1}&name=${name}&release_date=${release_date}&developer=${developer}&publisher=${publisher}&platforms=${platforms}&required_age=${required_age}&categories=${categories}&genres=${genres}&users_tags=${users_tags}&positive_reviews=${positive_reviews}`}>Page precédente</a>
                <a href={`/?page=${parseInt(page) + 1}&name=${name}&release_date=${release_date}&developer=${developer}&publisher=${publisher}&platforms=${platforms}&required_age=${required_age}&categories=${categories}&genres=${genres}&users_tags=${users_tags}&positive_reviews=${positive_reviews}`}>Page suivante</a><br></br>
            </div>
            

            
             
            
            {choose(props.donnees)}
            
        </div>
    );
}

export default Tableau;