import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"

import express from "express"
import cors from "cors"
import createJwt from "./controller/dataController.js"


const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("view"))

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}))

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))

console.log(process.version);  // Example: v18.17.1

app.post('/createtoken', createJwt)


app.listen(4000 || process.env.PORT);









// Route
// app.post('/createjwt', async (req, res) => {
//   try {
//     const requestBody = req.body;
//     if (!requestBody || Object.keys(requestBody).length === 0) {
//       return res.status(400).json({ msg: "write something" });
//     }

//     const jwt = await finalData.create(req.body);
//     console.log(jwt);

//     res.status(201).json({ msg: "jwt created", jwt }); // ✅ corrected response structure
//   } catch (err) {
//     console.error("Error:", err); // log the actual error
//     res.status(500).json({ msg: "internal server error" });
//   }
// });

// app.listen(4000, () => {
//   console.log('Server running on port 4000');
// });

