import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local';
import db from "../db/conn.mjs";
import bcrypt from "bcrypt"

async function validate(username) {
    let collection = await db.collection("users");
    const query = { username: username };
    let results = await collection.find(query).toArray();
    return results
}

passport.use(new LocalStrategy(
    async function (username, password, done) {
        let user = await validate(username)

        if (!user) {
            done(null, false, { message: 'Incorrect username' });
        }

        try {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    
                    done(null, user);
                }
                else {
                    done(null, false, { message: 'Incorrect password or username' });
                }
            });
            
        } catch (error) {
            done(null, false, { message: 'Incorrect password or username' });
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});