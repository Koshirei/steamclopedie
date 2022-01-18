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

            let res = await fetch(`http://localhost:3001/api/recherche?page=${searchParams.get("page")}&name=${searchParams.get("name")}`, {mode: "cors"});
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
        let plateform: any = document.getElementById("plateform");
        let minimum_age: any = document.getElementById("minimum_age");
        let category: any = document.getElementById("category");
        let type: any = document.getElementById("type");
        let users_tags: any = document.getElementById("users_tags");
        let positive_reviews: any = document.getElementById("positive_reviews");

        setPage(1);
        // let demande: any = e.target;
        console.log(date);
        
        // setDemande(demande.value);
        
        let query  = async function() {
            // let res = await fetch(`http://localhost:3001/api/recherche?page=${page}&demande=${demande}`, {
            let res = await fetch(`http://localhost:3001/api/recherche?page=${page}&name=${name.value}&release_date=${release_date.value}&developer=${developer.value}&publisher=${publisher.value}&plateform=${plateform.value}&minimum_age=${minimum_age.value}&category=${category.value}&type=${type.value}&users_tags=${users_tags.value}&positive_reviews=${positive_reviews.value}`, {
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
                plateform :              <input id="plateform" type="text"></input><br></br>
                minimum age :            <input id="minimum_age" type="text"></input><br></br>
                category :               <input id="category" type="text"></input><br></br>
                type :                   <input id="type" type="text"></input><br></br>
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