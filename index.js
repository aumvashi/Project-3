const express = require("express"); 

const {users} = require("./DATA/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());


app.get("/",(req,res) => {
    res.status(200).json({
        message : "Server is up and running :)",
    });
});

/*
    Route: /users
    Method: GET
    Desc: Get all users
    Access: Public
    Parameters: None
*/ 

app.get("/users",(req,res)=>{
    res.status(200).json({
        success: true,
        data: users,
    })
})

app.get("*",(req,res)=>{
    res.status(404).json({
        message : "This root doesnt exists :("
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
});