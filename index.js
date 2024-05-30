const express = require("express");

const { users } = require("./DATA/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :)",
  });
});

/*
    Route: /users
    Method: GET
    Desc: Get all users
    Access: Public
    Parameters: None
*/

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/*
    Route: /users/:id
    Method: GET
    Desc: Get single users
    Access: Public
    Parameters: id
*/

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User Not Found :(",
    });
  }
  res.status(200).json({
    success: true,
    message: "User Found :)",
    data: user,
  });
});

/*
    Route: /users
    Method: POST
    Desc: Add New User
    Access: Public
    Parameters: None
*/

app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);

  if (user) {
    res.status(404).json({
      success: false,
      message: "ID Already Exixts...",
    });
  }
  users.push({
    id,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "User Added Successfully...",
    data: users,
  });
});

/*
    Route: /users/:id
    Method: PUT
    Desc: Updating User by ID
    Access: Public
    Parameters: ID
*/

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exists...",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User Updated...",
    data: updateUserData,
  });
});

/*
    Route: /users/:id
    Method: DELETE
    Desc: Deleting User by ID
    Access: Public
    Parameters: ID
*/

app.delete("/users/:id",(req, res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);
    if(!user){
        res.status(404).json({
            success: false,
            message: "User Doesn't Exist...",
        });
    }

    // Logic for delete still left

})

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This root doesnt exists :(",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
