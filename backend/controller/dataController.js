import finalData from "../model/dataModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const createJwt = async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name || !type) {
      return res.status(400).json({ msg: "write name and select type" });
    }

    let token;
    if (type === "jwt") {
      const secretKey = process.env.JWT_SECRET;
      token = jwt.sign({ name }, secretKey, { expiresIn: "2h" });
    } 
    
    else if (type === "md5") {
      token = crypto.createHash("md5").update(name).digest("hex");
    }
    else if (type === "sha1") {
      token = crypto.createHash("sha1").update(name).digest("hex"); 
    }
    else {
      return res.status(400).json({ msg: "Invalid type. Must be 'jwt' or 'md5'" });
    }
    

    res.status(201).json({ msg: `${type} token created`, token });
  } catch (err) {
    console.error("Token creation error:", err);
    res.status(500).json({ msg: "internal server error" });
  }
};

export default createJwt;
