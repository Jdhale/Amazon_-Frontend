const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// Corrected MongoDB connection string (ensure special characters are properly encoded)
const connection_url = 'mongodb+srv://janhvidhale4:janhvi%40123@cluster0.bt8fq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB with proper error handling
mongoose.connect(connection_url);

// Simple route
app.get('/', (req, res) => {
  res.send("Hello, the server is running!");
});

app.post("/products/get", (req, res) => {
  const productDetail = req.body;
  console.log("Product Detail >>>>", productDetail);
  Products.create(productDetail, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/products/get", (req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});


app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user_exist = await Users.findOne({ email });

  if (user_exist) {
    return res.status(400).json({ message: "The Email is already in use!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Users({
    email,
    password: hashedPassword,
    fullName,
  });

  await newUser.save();

  res.status(201).json({ message: "User Created Successfully", token, user: newUser });
});
// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
