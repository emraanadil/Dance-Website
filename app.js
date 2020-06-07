const fs = require('fs');;
const express=require('express');
const port=8000;
const path=require('path');
const app=express();
var mongoose = require('mongoose');
const bodyparser=require('body-parser')
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true });


//define mongoose schema
var contactSchema = new mongoose.Schema({
     name: String,
     phone: String,
     email: String,
     age: String,
     address: String,
   });
   var contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static("static"))
app.use(express.urlencoded());
// PUG SPECIFIC STUFF:
app.set('viewengine','pug')
app.set('views',path.join(__dirname,'views'));

// ENDPOINTS
app.get('/',(req,res)=>{const params={}
     res.status(200).render("home.pug",params)
})

app.get('/contact',(req,res)=>{const params={}
     res.status(200).render("contact.pug",params)
})
app.post('/contact',(req,res)=>{
     var myData=new contact(req.body);
     myData.save().then(()=>{
          res.send("Your Form is Submitted Successfully")
     }
     ).catch(()=>{
          res.status(404).send('Form Submission Failed')
     })
     // res.status(200).render("contact.pug")
})


// STARTING THE SERVER
app.listen(port,()=>{
    console.log(`The App Has Launched Successfully at port ${port}`)
})
