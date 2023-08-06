const express=require('express')
const App=express()
const path=require('path')
const hbs=require('hbs') //handle bar 
const DB=require('./DB/mongoose')
const Login=require('./DB/Login')
const Signup=require('./DB/Signup')
const bcrypt=require('bcryptjs')
const async = require('hbs/lib/async')
const { Sign } = require('crypto')
const Razorpay = require('razorpay');
const PORT=2000
var instance = new Razorpay({ key_id: 'rzp_test_HQclkk1CzfaqGL', key_secret: 'nSEbHzYWHHTD3IKH3ehy5bG0' })

const public_path=path.join(__dirname,"/public")
const views_path=path.join(__dirname,"/Templateengine/views")
const partials_path=path.join(__dirname,"/Templateengine/partials")

App.use(express.urlencoded())
App.use(express.static(public_path))
App.set('view engine','hbs')
App.set('views',views_path)
hbs.registerPartials(partials_path)


App.get("/",(req,res)=>{
    res.render('start')
    console.log("DONE")
})

App.get("/login",(req,res)=>{
    res.render('login')
    console.log("DONE")
})
App.get("/signup",(req,res)=>{
    res.render('signup')
    console.log("DONE")
})

App.get("/home",(req,res)=>{
    res.render('home')
    console.log("DONE")
})
App.get("/service",(req,res)=>{
    res.render('service')
    console.log("DONE")
})
App.get("/Help",(req,res)=>{
    res.render('help')
    console.log("DONE")
})

App.get("/cart",(req,res)=>{
    var options = {
        amount: 250000,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.send({orderId:order.id})
      });

    res.render('cart')
    console.log("DONE")
    })


App.get("/search",(req,res)=>{
    res.render('search')
    console.log("DONE")
})

App.get("/service/tiffin",(req,res)=>{
    res.render('tiffin')
})

App.get("/profile",(req,res)=>{
    res.render('profile')
})


// POST
App.post("/login",async(req,res)=>{
    try {
        
        const phone=req.body.phone
        const password=req.body.password

        console.log(`${password}`)
        
        Login.findOne({phone:phone})
        .then(user => {
                if (user) {
                  // Password found
                  const password_new = user.password;
                  bcrypt.compare(password, password_new)
                  .then(error => {
                    res.render('home')
                    console.log(error) // return true
                  }).catch(
                    res.render('login',{notvalid:"Invalid phone number or password"})
                  )    
                  
                } else {
                  // No document found for the given phone number
                  res.render('login',{notvalid:"Invalid phone number or password"})
                }
        })

     } catch (error) {
         res.render('start')
         console.log("NO_login")
     }
})

App.post("/signup",async(req,res)=>{
    try {
        
        const Password_signup=req.body.Password_sign
        const Phone_signup=req.body.Phone_sign
        const Name_signup=req.body.Name_sign
        const Email_signup=req.body.Email_sign
        
        
        console.log(`${Phone_signup}${Name_signup}${Password_signup}`)

        if(Signup.findOne(Phone_signup)){

        const newSignup= new Signup({
            name_signup:Name_signup,
            email_signup:Email_signup,
            phone_signup:Phone_signup,
            password_signup:Password_signup
       })
       
        

       const newLogin= new Login({
            phone:Phone_signup,
            password:Password_signup
        })
       
        res.render('profile',{user:Name_signup,phone:Phone_signup,email:Email_signup})
        

        const save_signup=await newSignup.save();
        const save_login=await newLogin.save();
        
    }
    else{
        res.render('signup')
    }
    } catch (error) {
        res.render("/")
        console.log(error)

    }
})





App.listen(PORT,(err)=>{
    console.log(`Connected ${PORT}`)
})