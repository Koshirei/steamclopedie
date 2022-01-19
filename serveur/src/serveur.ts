import express from "express";
import cors from "cors";
import elasticsearch from "elasticsearch";
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

const client = new elasticsearch.Client({
    host: "localhost:9200",
    // log: "trace"
});

app.get('/api/jeux/all', (req, res) => {

    let query = async function () {
        const body = await client.search({
            index: "steam-database",
            size: 50,
            body: {
                query: {
                    match_all: {}
                },
                sort: [{
                    appid: {
                        order: "asc"
                    }
                }]
            },

        });

        let rep: any[] = body.hits.hits;

        rep = rep.map((value) => {
            // console.log(value);

            return ({
                appid: value._source.appid,
                name: value._source.name,
                release_date: value._source.release_date,
                positive_ratings: value._source.positive_ratings,
                background: value._source.background,
                header_image: value._source.header_image
            });
        });

        res.send(rep);
    }

    query();
});

app.get('/api/jeux/:appid', (req, res) => {

    let query = async function () {
        let body = await client.search({
            index: "steam-database",
            body: {
                query: {
                    match: {
                        appid: req.params.appid
                    }
                }
            }
        });

        let rep: any[] = await body.hits.hits;

        if (body.hits.hits.length > 0) {

            rep = rep.map((value) => {


                return ({
                    appid: value._source.appid,
                    name: value._source.name,
                    release_date: value._source.release_date,
                    background: value._source.background,
                    header_image: value._source.header_image,
                    platforms: value._source.platforms,
                    detailed_description: value._source.detailed_description,
                    // about_the_game: value._source.about_the_game,
                    screenshots: JSON.parse(value._source.screenshots.replace(/'/g, "\"")),
                    mac_requirements: value._source.mac_requirements,
                    pc_requirements: value._source.pc_requirements,
                    minimum: value._source.minimum,
                    short_description: value._source.short_description,
                    developer: value._source.developer,
                    publisher: value._source.publisher,
                    positive_ratings: value._source.positive_ratings,
                    negative_ratings: value._source.negative_ratings,
                    linux_requirements: value._source.linux_requirements,
                    movies: value._source.linux_requirements
                });
            });
        }




        res.send(rep);
    }

    query();
});


interface IQuery {
    page: string;
    name: string;
    release_date: string;
    developer: string;
    publisher: string;
    platforms: string;
    required_age: string;
    categories: string;
    genres: string;
    users_tags: string;
    positive_reviews: string;

}

app.get("/api/recherche", (req, res) => {

    console.log(req.body);
    

    let page: any = req.query.page;

    let q: any = req.query;

    let vide = 1;

    for (let key in req.query) {
        if (req.query[key] == "null") {
            req.query[key] = "";
        }

        if (key != "page" && req.query[key] != "") {
            vide = 0;
        }

        if (key == "positive_reviews") {
            // @ts-ignore
            // req.query[key] = 0;
        }
    }



    if (req.query.release_date === "" || req.query.release_date === undefined || req.query.release_date === "null") {
        req.query.release_date = undefined;
    }

    if (isNaN(page)) {
        page = 1;
    }

    if (page === "null" || page === "") {
        page = 1;
    }

    if (page < 1) {
        page = 1;
    }



    console.log("page " + page);

    req.query.platforms = (<any>req.query).platforms.replace(" ", ";");

    console.log(req.query);

    let name = req.query.name;

    let query = async function () {
        let body;

        if (vide) {
            body = await client.search({
                index: "steam-database",
                size: 25,
                from: (page - 1) * 25,
                body: {
                    query: {
                        match_all: {}
                    },
                    sort: [{
                        positive_ratings: {
                            order: "desc"
                        }
                    }]
                },

            });

        } else {
            body = await client.search({
                index: "steam-database",
                size: 50,
                from: (page - 1) * 25,
                body: {
                    query: {
                        bool: {
                            must: [
                                {
                                    match: {
                                        name: {
                                            query: req.query.name,
                                            operator: "and",
                                            zero_terms_query: "all"
                                        }
                                    }
                                },
                                // { 
                                //     match: { 
                                //         release_date: {
                                //             query: req.query.release_date,
                                //             operator: "and",
                                //             zero_terms_query: "all"
                                //         }
                                //     } 
                                // },
                                { 
                                    match: { 
                                        developer: {
                                            query: req.query.developer,
                                            operator: "and",
                                            zero_terms_query: "all"
                                        }
                                    } 
                                },
                                { 
                                    match: { 
                                        publisher: {
                                            query: req.query.publisher,
                                            operator: "and",
                                            zero_terms_query: "all"
                                        }
                                    } 
                                },
                                { 
                                    match: { 
                                        platforms: {
                                            query: req.query.platforms,
                                            operator: "and",
                                            zero_terms_query: "all"
                                        }
                                    } 
                                },
                                { 
                                    match: { 
                                        required_age: {
                                            query: req.query.required_age,
                                            operator: "and",
                                            zero_terms_query: "all"
                                        }
                                    } 
                                },
                                { 
                                    match: { 
                                        categories: {
                                            query: req.query.categories,
                                            operator: "and",
                                            zero_terms_query: "all"
                                        }
                                    } 
                                },
                                { 
                                    match: { 
                                        genres: {
                                            query: req.query.genres,
                                            operator: "and",
                                            zero_terms_query: "all"
                                        }
                                    } 
                                },
                                { 
                                    match: { 
                                        steamspy_tags: {
                                            query: req.query.users_tags,
                                            operator: "and",
                                            zero_terms_query: "all"
                                        }
                                    } 
                                },
                                // { 
                                //     match: { 
                                //         positive_ratings: {
                                //             query: req.query.positive_reviews,
                                //             operator: "and",
                                //             zero_terms_query: "all"
                                //         }
                                //     } 
                                // },
                            ],
                        }
                    }  
                },
            });
        }


        let rep: any[] = body.hits.hits;

        

        if (body.hits.hits.length > 0) {

            rep = rep.map((value) => {

                return ({
                    appid: value._source.appid,
                    name: value._source.name,
                    release_date: "a",
                    positive_ratings: value._source.positive_ratings,
                    background: value._source.background,
                    header_image: value._source.header_image
                });
            });
        }

        res.send(rep);
    }

    query().catch((err) => {
        console.log(err);
        res.send({ erreur: "erreur" });

    });

});

app.get("/api/fuzzysearch/", (req, res) => {
    let name = req.query.name;

    let query = async function () {
        let body;

        body = await client.search({
            index: "steam-database",
            size: 5,
            body: {
                query: {
                    match: {
                        name: {
                            query: name,
                            fuzziness: "AUTO"
                            
                        }
                    }
                },
                sort: [{
                    // appid: {
                    //     order: "asc"
                    // }
                }],
            },
        });

        let rep: any[] = body.hits.hits;

        if (body.hits.hits.length > 0) {

            rep = rep.map((value) => {
                // console.log(value);

                return ({
                    // appid: value._source.appid,
                    name: value._source.name,
                    // release_date: value._source.release_date,
                    // positive_ratings: value._source.positive_ratings,
                    // background: value._source.background,
                    // header_image: value._source.header_image
                });
            });
        }

        res.send(rep);
    }

    query();
});

app.listen(3001, () => {
    console.log(`écoute sur http://localhost:${3000}`)
});