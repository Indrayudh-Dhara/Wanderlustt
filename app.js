if(process.env.NODE_ENV != "production"){// we only use .env when project not in production/deplyoment and is only accesed by the creator
    require('dotenv').config()
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const Listing = require("./models/listing.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");
const filterRouter = require("./routes/filter.js");
const dbUrl = process.env.ATLASTDB_URL;
const MongoStore = require('connect-mongo');



app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'/public')));


main().then((res)=>{
    console.log("connection is successful");
}).catch((err)=>{{
    console.log(err);
}})

const store = MongoStore.create({
     mongoUrl: dbUrl ,
     crypto :{
        secret: process.env.SECRET,
     },
     touchAfter: 24*3600, //read npm connect-mongo docs

    })

store.on("error",()=>{
    console.log("SOME MONGO STORE ERROR");
})

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized: true,
    cookie : {
        expires : Date.now() + 7*24*60*60*1000,//a time in ms which is 7 days later from time right now for the cookie to expire(ms as date.now deals in ms)
        maxAge :  7*24*60*60*1000,
        httpOnly : true, //for security purpose to avoid crossScripting attacks (what is that? read from internet)
    }
}



async function main() {
    await mongoose.connect(dbUrl);
  }



// app.get('/' , (req,res)=>{
//     res.send("WanderLust")
// });

app.use(session(sessionOptions));//declare before routes
app.use(flash());//declare before routes
//passport always after session as passports uses session
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{ //middleware for flash
    res.locals.success = req.flash("success"); //accessing by res.locals which can stores vars(in form on arrays) which we can use while rendering a template without even passing it
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;//as req.user stores all the info about curr user , we need to use those in templates for login logout custom pages
    next();
})

// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username : "ravi"
//     })
//     let registeredUser= await User.register(fakeUser,"mypassword");//register is a static method inbuilt in pass-loc-mongoose . Read npm docs
//     res.send(registeredUser);
// })

app.use("/listings",listingsRouter); // /listings are called as parent route (a route that is always present in the first & anything after that is called child route)
app.use("/",filterRouter);
app.use("/listings/:id/reviews",reviewsRouter);//now as the parent route has a parameter , we need to accessit to the router page as it in only accessable here for now , unless we use mergeparams:true
app.use("/",userRouter);




app.all("*", async (req,res)=>{
        const allListings = await Listing.find({}).limit(15);
        res.render("listings/index.ejs", {allListings});
});

app.use((err,req,res,next)=>{
    let {statusCode = 500 , message = " SOMETHING WENT WRONG"}= err;
    res.status(statusCode).render("error.ejs",{message});
  
});

app.listen(port , ()=>{
    console.log(`listening on port ${port}`);
});
