const { AppsSharp } = require("@material-ui/icons");
const express = require("express");
const fs = require("fs");
const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "typingtestDB"
});
// Connect
db.connect(err => {
    if (err) throw err;
    console.log("MYSql Connected...");
});

function sortWords(unfilteredWords) {
    let wordStore = [];
    for (let i = 0; i < 500; i++) {
        let randomIndex = Math.floor(Math.random() * 3000);
        wordStore.push(unfilteredWords[randomIndex].word);
    }
    return wordStore;
}

//Init app
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));





app.get("/", (req, res) => {
    let sql = "SELECT word FROM words";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        let wordStore = sortWords(result);
        // NOw render the ejs file 
        res.render("index", { wordStore: wordStore })
    })
});


app.listen(3000, () => {
    console.log("Server has started on PORT 3000");
})