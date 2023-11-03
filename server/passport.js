import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import  passport from 'passport'
import dotenv from 'dotenv'
import userModel from './models/userModel.js'

dotenv.config();

async function generateUniqueUsername(baseUsername) {
  let uniqueUsername = baseUsername;
  let counter = 0;

  // Check if the username already exists
  while (await userModel.findOne({ username: uniqueUsername })) {
    counter++;
    uniqueUsername = `${baseUsername}${counter}`;
  }

  return uniqueUsername;
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let user = await userModel.findOne({ email: email });
      

      if (!user) {
        let name = profile.displayName.split(" ");
        let firstname = name[0];
        let lastname = name.length > 1 ? name[name.length - 1] : "";
        let baseUsername = profile.displayName.replace(/\s+/g, '').toLowerCase();
      let username = await generateUniqueUsername(baseUsername);

        user = new userModel({
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          // Since password is required in your schema, consider how you handle this for OAuth users.
          // You might need a random password or a different handling for users who sign in via Google.
          password: "SomeRandomPasswordOrHandlingMechanism", 
        });

        await user.save();
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

passport.serializeUser((user, done)=> {
    done(null, user);
})

passport.deserializeUser((user, done)=>{
    done(null, user);
})