import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";


interface RechercheProps {
    resultat: (data: any[]) => void;
};

function Recherche(props: RechercheProps) {
    
    const [searchParams, setSearchParams] = useSearchParams();
    // const page: any = searchParams.get("page")?.toString();
    const [name, setName]: any = useState("");
    const [page, setPage]: any = useState(1);
    const [date, setDate]: any = useState("");

    // let page: any = searchParams.get("page");
    
    useEffect(() => {
        setPage(searchParams.get("page"));

        let p: any = searchParams.get("page");

        // console.log(searchParams.get("page"));

        let name: any = document.getElementById("name");
        name.value = searchParams.get("name");
        // input.style.background = "black";
        // con sole.log(input.value);
        

        

        let query  = async function() {

            let name: any = searchParams.get("name");
            let release_date: any = searchParams.get("release_date");
            let developer: any = searchParams.get("developer");
            let publisher: any = searchParams.get("publisher");
            let platforms: any = searchParams.get("platforms");
            let required_age: any = searchParams.get("required_age");
            let categories: any = searchParams.get("categories");
            let genres: any = searchParams.get("genres");
            let users_tags: any = searchParams.get("users_tags");
            let positive_reviews: any = searchParams.get("positive_reviews");

            let res = await fetch(`http://localhost:3001/api/recherche?page=${page}&name=${name}&release_date=${release_date}&developer=${developer}&publisher=${publisher}&platforms=${platforms}&required_age=${required_age}&categories=${categories}&genres=${genres}&users_tags=${users_tags}&positive_reviews=${positive_reviews}`, {mode: "cors"});
            let json = await res.json();
            console.log(json);
            
            props.resultat(json);
        }

        query();    

        if (isNaN(parseInt(p))) {
            setPage(1);
        } // else {
        //     setPage(parseInt(page));
        // }

        // setPage(searchParams.get("page"));
        setName(searchParams.get("name"));

    }, []);

    function update(e: React.MouseEvent<HTMLInputElement>) {
        e.preventDefault();

        let name: any = document.getElementById("name");
        let release_date: any = document.getElementById("release_date");
        let developer: any = document.getElementById("developer");
        let publisher: any = document.getElementById("publisher");
        let platforms: any = document.getElementById("platforms");
        let required_age: any = document.getElementById("required_age");
        let categories: any = document.getElementById("categories");
        let genres: any = document.getElementById("genres");
        let users_tags: any = document.getElementById("users_tags");
        let positive_reviews: any = document.getElementById("positive_reviews");

        setPage(1);
        // let demande: any = e.target;
        console.log(date);
        
        // setDemande(demande.value);
        
        let query  = async function() {
            // let res = await fetch(`http://localhost:3001/api/recherche?page=${page}&demande=${demande}`, {
            let res = await fetch(`http://localhost:3001/api/recherche?page=${page}&name=${name.value}&release_date=${release_date.value}&developer=${developer.value}&publisher=${publisher.value}&platforms=${platforms.value}&required_age=${required_age.value}&categories=${categories.value}&genres=${genres.value}&users_tags=${users_tags.value}&positive_reviews=${positive_reviews.value}`, {
                mode: "cors",
                method: "GET",
            });

            let json = await res.json();

            props.resultat(json);
        }

        query();
    }       

    return (
        <>
            <form>
                name :                   <input id="name" type="text"></input><br></br>
                release date :           <input id="release_date" type="date"></input><br></br>
                developer :              <input id="developer" type="text"></input><br></br>
                publisher :              <input id="publisher" type="text"></input><br></br>
                platforms :              <input id="platforms" type="text"></input><br></br>
                minimum age :            <input id="required_age" type="text"></input><br></br>
                categories :               <input id="categories" type="text"></input><br></br>
                genres :                   <input id="genres" type="text"></input><br></br>
                users tags :             <input id="users_tags" type="text"></input><br></br>
                % of positive review :   <input id="positive_reviews" type="text"></input><br></br>
                                         <input type="submit" value="Search" onClick={update}></input>
            </form>

            <a href={`/?page=${parseInt(page) - 1}&name=${name}`}>Page precédente</a>
            <a href={`/?page=${parseInt(page) + 1}&name=${name}`}>Page suivante</a><br></br>
        </>
    )
}

export default Recherche;