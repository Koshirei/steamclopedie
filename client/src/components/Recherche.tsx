import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import "./Recherche.css";

interface RechercheProps {
    resultat: (data: any[]) => void;
};

function Recherche(props: RechercheProps) {
    
    const [searchParams, setSearchParams] = useSearchParams();
    // const page: any = searchParams.get("page")?.toString();
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


    const [page, setPage]: any = useState(1);
    const [date, setDate]: any = useState("");
    const [fuzzy, setFuzzy] = useState<any[]>([]);

    // let page: any = searchParams.get("page");
    
    useEffect(() => {
        setPage(searchParams.get("page"));

        let p: any = searchParams.get("page");

        let name: any = document.getElementById("name");
        name.value = searchParams.get("name");
        setName(searchParams.get("name"));


        let query  = async function() {
            let page = searchParams.get("page");


            let name: any = searchParams.get("name");
            let release_date: any = searchParams.get("release_date");
            let developer: any = searchParams.get("developer");
            let publisher : any = searchParams.get("publisher");
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
        } 

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

        setName(name.value);
        setReleaseDate(release_date.value);
        setPublisher(publisher.value);
        setDeveloper(developer.value);
        setPlatforms(platforms.value);
        setRequiredAge(required_age.value);
        setCategories(categories.value);
        setGenres(genres.value);
        setUsersTags(users_tags.value);
        setPositiveReviews(positive_reviews.value);
        

        setPage(1);
        // let demande: any = e.target;
        console.log(date);
        
        // setDemande(demande.value);
        
        let query  = async function() {
            // let res = await fetch(`http://localhost:3001/api/recherche?page=${page}&demande=${demande}`, {
            let res = await fetch(`http://localhost:3001/api/recherche?page=${1}&name=${name.value}&release_date=${release_date.value}&developer=${developer.value}&publisher=${publisher.value}&platforms=${platforms.value}&required_age=${required_age.value}&categories=${categories.value}&genres=${genres.value}&users_tags=${users_tags.value}&positive_reviews=${positive_reviews.value}`, {
                mode: "cors",
                method: "GET",
            });

            let json = await res.json();

            props.resultat(json);
        }

        query();
    }       

    function fuzzysearch(e: React.KeyboardEvent<HTMLInputElement>) {
        let query  = async function() {
            let r : any = e.target;

            // let res = await fetch(`http://localhost:3001/api/recherche?page=${page}&demande=${demande}`, {
            let res = await fetch(`http://localhost:3001/api/fuzzysearch?name=${r.value}`, {
                mode: "cors",
                method: "GET",
            });

            let json = await res.json();

            setFuzzy(json);

            console.log(json);
            
        }

        query();
    }

    function renderFuzzysearch() {
        return fuzzy.map((value) => {
            console.log(value.name);
            
            return (<><a href={`?page=${1}&name=${value.name}`}>{value.name}</a><br></br></>);
        });
    }

    function renderPagination() {
       


    }


    return (
        <div id="search">
            <form>
                name :                   <input id="name" type="text" onKeyUp={fuzzysearch}></input><br></br>

                <div id="fuzzy_search">
                    {renderFuzzysearch()}
                </div>

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

           
            
            <a href={`/?page=${parseInt(page) - 1}&name=${name}&release_date=${release_date}&developer=${developer}&publisher=${publisher}&platforms=${platforms}&required_age=${required_age}&categories=${categories}&genres=${genres}&users_tags=${users_tags}&positive_reviews=${positive_reviews}`}>Page precédente</a>
            <a href={`/?page=${parseInt(page) + 1}&name=${name}&release_date=${release_date}&developer=${developer}&publisher=${publisher}&platforms=${platforms}&required_age=${required_age}&categories=${categories}&genres=${genres}&users_tags=${users_tags}&positive_reviews=${positive_reviews}`}>Page suivante</a><br></br>
        </div>
    )
}

export default Recherche;