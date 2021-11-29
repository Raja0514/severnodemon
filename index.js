const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || "3002";

app.get("/", (req, res) => {
  res.send("server running sucessfully......");
});
//mongodb connection
mongoose.connect(
  "mongodb+srv://admin:rajamoni051412@test.q8lbl.mongodb.net/NewDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);
const userschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = new mongoose.model("usercollections", userschema);
//routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "login succesfull", user: user });
      } else {
        res.send({ message: "password did not match" });
      }
    } else {
      res.send({ message: "user not registred" });
    }
  });
});
app.post("/register", (req, res) => {
  const { name, email, password, reEnterpassword } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already registred" });
    } else {
      const user = new User({ name, email, password });

      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "successfully registered please login now" });
        }
      });
    }
  });
});
app.listen(port, () => {
  console.log(`server running at port no ${port} `);
});
