const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const multer = require("multer") ; 
const path = require("path")
const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

app.get('/', (req, res) => {
  res.send('THIS IS SPOTWISE BACKEND SERVER !!');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Updated MongoDB connection without deprecated options
mongoose
  .connect("mongodb+srv://anisaskri:52978978aA@ecommerce.kqbp9od.mongodb.net/", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Exit the process if there is a connection error
  });
const User = require("./models/user");
const SpotData = require("./models/spotData");
const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "askrianis74@gmail.com ",
      pass: "qlfeqidgtdxnfuor",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "SPOTWISE ",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
// Register a new user
// ... existing imports and setup ...
// get all users
const GetUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const GetData = async (req, res) => {
  try {
    const data = await SpotData.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStatus = async (parkingSpaceId) => {
  try {
    // Find the document with the given parking space ID
    const document = await SpotData.findOne({ "parking_spaces.id": parkingSpaceId });

    // If document doesn't exist, return an error
    if (!document) {
      throw new Error("Parking spot not found");
    }

    // Find the parking space within the document
    const parkingSpace = document.parking_spaces.find(space => space.id === parkingSpaceId);

    // Update the status of the parking space to "pending"
    parkingSpace.status = "pending";

    // Save the updated document
    await document.save();

    // Return the updated parking space
    return parkingSpace;
  } catch (error) {
    throw error; // Forward the error to the caller
  }
};
app.put("/parking/:id/pending", async (req, res) => {
  try {
    const parkingSpaceId = req.params.id;
    const updatedParkingSpace = await updateStatus(parkingSpaceId);
    res.json(updatedParkingSpace);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});



// Define the route for GET request to fetch users
app.get("/users", GetUsers);
app.get("/data", GetData);
app.put("/parking/")
app.post("/data", async (req, res) => {
  try {
    const { floor, camera_id, parking_spaces } = req.body;
    const newSpotData = new SpotData({ floor, camera_id, parking_spaces });
    await newSpotData.save();
    console.log("DATA HAS BEEN SAVED SUCCESSFULLY");
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.log("Error during saving new spot DATA:", error); // Debugging statement
    let errorMessage = "Saving failed";
    if (error.errors) {
      // Mongoose validation error
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      errorMessage = validationErrors.join(", ");
    }
    res.status(500).json({ message: errorMessage });
  }
});

app.post("/register", async (req, res) => {

    try {
      const { name, email, password,  gender, phoneNumber, dateOfBirth } = req.body;
  

      // Check if user with the given email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
      }
  
      // Create a new user
      const newUser = new User({ name, email, password, gender, phoneNumber, dateOfBirth });
      newUser.verificationToken = crypto.randomBytes(20).toString("hex");

      await newUser.save();
    console.log(newUser.verificationToken);
  
      res.status(201).json({ message: "User registered successfully" });
      sendVerificationEmail (newUser.email , newUser.verificationToken)
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
console.log(token);
    //Find the user witht the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
});
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

//endpoint to login the user!
const bcrypt = require('bcryptjs');

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);
    console.log(token)
    res.status(200).json({ token ,_id : user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login Failed" });
  }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name with original extension
  }
});

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });

// POST endpoint to handle image uploads
app.post('/upload', upload.single('profilePicture'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // If file is uploaded successfully, return its details
    res.status(200).json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      path: req.file.path
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Failed to upload file' });
  }
});
