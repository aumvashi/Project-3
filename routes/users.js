const express = require("express");

const {users} = require("../data/users.json");

const router = express.Router();

/*
    Route: /
    Method: GET
    Desc: Get all users
    Access: Public
    Parameters: None
*/

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/*
    Route: /:id
    Method: GET
    Desc: Get Users By Id
    Access: Public
    Parameters: id
*/

router.get("/:id", (req, res) => {
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
    Route: /
    Method: POST
    Desc: Add New User
    Access: Public
    Parameters: None
*/

router.post("/", (req, res) => {
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
    Route: /:id
    Method: PUT
    Desc: Updating User by ID
    Access: Public
    Parameters: ID
*/

router.put("/:id", (req, res) => {
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
    Route: /:id
    Method: DELETE
    Desc: Deleting User by ID
    Access: Public
    Parameters: ID
*/

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User Doesn't Exist...",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "Deleted User...",
    data: users,
  });
});

module.exports = router;
