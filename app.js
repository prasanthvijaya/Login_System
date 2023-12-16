const express = require("express");
const mysql=require("mysql");
const env=require("dotenv");
const path=require("path");
const hbs=require("hbs");
const app=express();

env.config({
    path:"./.env",
});

const db=mysql.createConnection(
    {
        host:process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password:process.env.DATABASE_PASS,
        database:process.env.DATABASE,
    }
);

db.connect((err)=>{
       if(err) {
        console.log(err);
       }
       else {
        console.log("Connected ");
       }
    }
);


app.use(express.urlencoded({extended:false}));
const location=path.join(__dirname,"./public");

app.use(express.static(location));
app.set("view engine","hbs");

const partialpath=path.join(__dirname,"./views/partials");
hbs.registerPartials(partialpath);

app.use('/',require("./routes/pages"));
app.use("/entry",require("./routes/auth"));

app.listen(5000,()=>{
  console.log("Server Started");
});