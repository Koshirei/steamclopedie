import { platform } from "os";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import "./Recherche.css";

interface RechercheProps {
    resultat: (data: any[]) => void;
};

function Recherche(props: RechercheProps) {

    const [advancedSearch, setAdvancedSearch] = useState("0");

    const [searchParams, setSearchParams] = useSearchParams();
  
    const [date, setDate]: any = useState("");
    const [fuzzy, setFuzzy] = useState<any[]>([]);

    const [rangeValue, setRangeValue] = useState(0);

    useEffect(() => {
        let p: any = searchParams.get("page");
        let name: any = document.getElementById("name");
        name.value = searchParams.get("name");


        let query = async function () {
            let page = searchParams.get("page");
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

            let res = await fetch(`http://localhost:3001/api/recherche?page=${page}&name=${name}&release_date=${release_date}&developer=${developer}&publisher=${publisher}&platforms=${platforms}&required_age=${required_age}&categories=${categories}&genres=${genres}&users_tags=${users_tags}&positive_reviews=${positive_reviews}`, { mode: "cors" });
            let json = await res.json();

            props.resultat(json);
        }

        query();

        if (isNaN(parseInt(p))) {
            // setPage(1);
        }

        toggleAdvancedSearch();

    }, []);

    useEffect(() => {
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

        name.value = searchParams.get("name");
        release_date.value = searchParams.get("release_date");
        developer.value = searchParams.get("developer");
        publisher.value = searchParams.get("publisher");
        // platforms.value = searchParams.get("platforms");
        // required_age.value = searchParams.get("required_age");
        categories.value = searchParams.get("categories");
        genres.value = searchParams.get("genres");
        users_tags.value = searchParams.get("users_tags");
        positive_reviews.value = searchParams.get("positive_reviews");

        let inputs : any = document.getElementsByTagName("input");

        for (let i=0; i<inputs.length; i++) {
            if (inputs[i].type === "text" && inputs[i].value === "null") {
                inputs[i].value = "";
            }
        }

        
        
    }, []);

    function update(e: React.MouseEvent<HTMLButtonElement>) {
        // e.preventDefault();

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

       


        // setPage(1);
        // let demande: any = e.target;
        console.log(date);

        // setDemande(demande.value);

        let query = async function () {
            // let res = await fetch(`http://localhost:3001/api/recherche?page=${page}&demande=${demande}`, {
            let res = await fetch(`http://localhost:3001/api/recherche?page=${1}&name=${name.value}&release_date=${release_date.value}&developer=${developer.value}&publisher=${publisher.value}&platforms=${platforms.value}&required_age=${required_age.value}&categories=${categories.value}&genres=${genres.value}&users_tags=${users_tags.value}&positive_reviews=${positive_reviews.value}`, {
                mode: "cors",
                method: "GET",
            });

            let json = await res.json();

            let form: any = document.getElementById("form");
            form.action = `?page=${1}&name=${name.value}&release_date=${release_date.value}&developer=${developer.value}&publisher=${publisher.value}&platforms=${platforms.value}&required_age=${required_age.value}&categories=${categories.value}&genres=${genres.value}&users_tags=${users_tags.value}&positive_reviews=${positive_reviews.value}`;

            props.resultat(json);
        }

        query();
    }



    function fuzzysearch(e: React.KeyboardEvent<HTMLInputElement>) {
        let query = async function () {
            let r: any = e.target;

            // let res = await fetch(`http://localhost:3001/api/recherche?page=${page}&demande=${demande}`, {
            let res = await fetch(`http://localhost:3001/api/fuzzysearch?name=${r.value}`, {
                mode: "cors",
                method: "GET",
            });

            let json = await res.json();

            setFuzzy(json);
        }

        query();
    }

    function renderFuzzysearch() {
        return fuzzy.map((value) => {
            return (<><a href={`?page=${1}&name=${value.name}`}>{value.name}</a><br></br></>);
        });
    }

    function toggleAdvancedSearch() {
        let advanced_search: any = document.getElementById("advanced_search");

        if (advancedSearch == "0") {
            advanced_search.style.display = "none";
            setAdvancedSearch("1");
        } else {
            setAdvancedSearch("0");
            advanced_search.style.display = "block";
        }
    }

    function resetFilters() {
        let inputs = document.getElementsByTagName("input");

        for (let i=0; i<inputs.length; i++) {
            console.log(inputs[i]);

            if (inputs[i].type === "text") {
                inputs[i].value = "";
            }
        }
    }

    function platformsCheckboxes(e: any) {
        let gcheckbox: any = document.getElementById("gcheckbox");
        // console.log("a");
        if (e.target.checked) {
            gcheckbox.value = gcheckbox.value + e.target.value + " ";
            
        } else {
            gcheckbox.value = gcheckbox.value.replace(e.target.value + " ", "");
            
        }

        console.log(gcheckbox.value);
    }

    function rangeEvent(e: any) {
        setRangeValue(e.target.value);
       
    }

    return (
        <div id="search">
            <form id="form" method="GET">
                <input type="hidden" name="page" value="1"></input>

                <div id="recherche">
                    <input autoComplete="off" id="name" type="text" name="name" onKeyUp={fuzzysearch}></input>
                    <button type="submit" onClick={update}>Submit</button>
                    <a id="toggle_advanced_search" href="#" onClick={toggleAdvancedSearch}>Toggle advanced search</a>
                </div>
                {/* name :                    */}

                <div id="fuzzy_search">
                    {renderFuzzysearch()}
                </div>

                <div id="advanced_search">
                    
                    Release date :          <input id="release_date" type="date" name="release_date"></input><br></br>
                    Developer :             <input id="developer" type="text" name="developer"></input><br></br>
                    Publisher :             <input id="publisher" type="text" name="publisher"></input><br></br>

                    <input id="gcheckbox" type="hidden" name="platforms" value=""></input>
                    Platforms :             
                                            <ul>

                                            
                                                <li><label><input type="checkbox"  value="windows" onClick={platformsCheckboxes}></input>Windows</label></li>
                                                <li><label><input type="checkbox"  value="linux" onClick={platformsCheckboxes}></input>Linux</label></li>
                                                <li><label><input  type="checkbox" value="mac" onClick={platformsCheckboxes}></input>Mac</label></li>
                                            </ul>
                                            <br></br>

                    Minimum age :           

                    <ul>
                        <li><label><input type="radio"  value="3" name="required_age"></input>3</label></li>
                        <li><label><input type="radio"  value="7" name="required_age"></input>7</label></li>
                        <li><label><input type="radio"  value="12" name="required_age"></input>12</label></li>
                        <li><label><input type="radio"  value="16" name="required_age"></input>16</label></li>
                        <li><label><input type="radio"  value="18" name="required_age"></input>18</label></li>
                    </ul>

                    Categories :            <input id="categories"  type="text" name="categories"></input><br></br>
                    Genres :                <input id="genres" type="text" name="genres"></input><br></br>
                    Users tags :            <input id="users_tags" type="text" name="users_tags"></input><br></br>
                    % of positive review :  <input id="positive_reviews" type="range"  step="1" name="positive_reviews" onChange={rangeEvent}></input>{rangeValue}<br></br>

                    <a id="reset_filters" href="#" onClick={resetFilters}>Reset filters</a>
                </div>
            </form>

            {/* <div id="pagination">
                <a href={`/?page=${parseInt(page) - 1}&name=${name}&release_date=${release_date}&developer=${developer}&publisher=${publisher}&platforms=${platforms}&required_age=${required_age}&categories=${categories}&genres=${genres}&users_tags=${users_tags}&positive_reviews=${positive_reviews}`}>Page precédente</a>
                <a href={`/?page=${parseInt(page) + 1}&name=${name}&release_date=${release_date}&developer=${developer}&publisher=${publisher}&platforms=${platforms}&required_age=${required_age}&categories=${categories}&genres=${genres}&users_tags=${users_tags}&positive_reviews=${positive_reviews}`}>Page suivante</a><br></br>
            </div> */}
        </div>
    )
}

export default Recherche;