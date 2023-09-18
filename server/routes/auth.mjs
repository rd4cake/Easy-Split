import express from "express";
import passport from "passport"
import db from "../db/conn.mjs";
import bcrypt from "bcrypt"
import axios from "axios";

const router = express.Router();

// This section will help you get a list of all the records.

router.post('/login', passport.authenticate('local', {
    keepSessionInfo: true,
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: 'http://localhost:3000/',
}));

router.post('/authenticated', async (req, res) => {
    const user = req.isAuthenticated();
    res.send(user)
});

router.post('/logout', async (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.send("logged out")
    });
});

router.get('/user', async (req, res) => {
  if (req.isAuthenticated()){
    res.send(req.user[0].username)
  }
  else{
    res.status(400).send(req.user)
  }
});

router.post('/register', async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password.' });
        }

        let newDocument = {
            username: req.body.username,
            password: hashedPassword,
        };
        let collection = await db.collection("users");
        let result = await collection.insertOne(newDocument);

        res.send(result).status(204);
    });

});



export default router;