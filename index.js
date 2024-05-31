const express = require("express");

const usersRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :)",
  });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesnt exists :(",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
