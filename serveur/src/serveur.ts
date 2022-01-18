import express from "express";
import cors from "cors";
import elasticsearch from "elasticsearch";

const app = express();

app.use(cors());

const client = new elasticsearch.Client({
    host: "localhost:9200",
    // log: "trace"
});

app.get('/api/jeux/all', (req, res) => {
    
    let query = async function() {
        const body = await client.search({
            index: "steam-database-test",
            size: 50,
            body: {
                query: {
                    match_all: {  }
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
    client.search({
        index: "steam",
        body: {
            query: {
                match: {
                    appid: req.params.appid
                }
            }
        }
      
    }, (error, response) => {
        if (error) console.log(error);
        
        res.setHeader("Access-Control-Allow-Origin", "*");

        if (response.hits != undefined) {

            let json: any = response.hits.hits;

            res.send(response.hits.hits[0]._source);
        } 
       
    });

});


app.get("/api/recherche", (req, res) => {

    // console.log(req.query);
    

    let page: any = req.query.page;
    // console.log(page);
    
    req.query.release_date = "2000-01-01";
    console.log(req.query.release_date);

    // console.log(date);
    


    if (page === "null" || page === "") {
        page = 1;
    }

    let name = req.query.name;

    
    let query = async function() {
        let body;
        
        /* if (name === "null") {
            body = await client.search({
                index: "steam-database-test",
                size: 25,
                from: (page - 1) * 25,
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

        } else { */
            body = await client.search({
                index: "steam-database-test",
                size: 50,
                from: (page - 1) * 50,
                body: {
                    query: {
                        bool: {
                            must: [
                                
                                
                            ],
                            // certaines clées sont pas bonnes
                            should: [
                                {match: {name: req.query.name}},
                                {match: {release_date: req.query.release_date}},
                                {match: {developer: req.query.developer}},
                                {match: {publisher: req.query.publisher}},
                                {match: {platforms: req.query.plateform}},
                                {match: {minimum_age: req.query.minimum_age}},
                                {match: {category: req.query.category}},
                                {match: {type: req.query.type}},
                                {match: {users_tags: req.query.users_tags}},
                                {match: {positive_reviews: req.query.positive_reviews}},
                            ]
                        }
                    },
                    sort: [{
                        // appid: {
                        //     order: "asc"
                        // }
                    }],          
                },
            });
        // }
        

        let rep: any[] = body.hits.hits;

        if (body.hits.hits.length > 0) {

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
        }

        res.send(rep);
    }

    query();
});
  
app.listen(3001, () => {
    console.log(`écoute sur http://localhost:${3000}`)
});