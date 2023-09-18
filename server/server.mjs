import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import auth from "./routes/auth.mjs";
import image from "./routes/image.mjs"
import session from "express-session";

import passport from "passport"
import "./auth/strategy.mjs"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/record", records);
app.use("/auth", auth);
app.use("/img", image);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});