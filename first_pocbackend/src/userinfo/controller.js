const pool = require("../../db");
const queries = require("./queries");
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'starsragul@gmail.com',
    pass: 'pizvfvjmtskcmunu' 
  }
});

const getUser = (req, res) => {
    pool.query(queries.getall, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  }
  const del=(req,res)=>{
    const email=req.params.email;


    const maildetails = {
      from: 'starsragul@gmail.com',
      to: email,
      subject: 'Deletion of of records',
      text: `${email}-your details Removed from Divum portal.`,
    
    };
    
    transporter.sendMail(maildetails, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } 
      
    });

    pool.query(queries.del,[email],(error,results)=>{
      if(error) throw error;
      res.status(200).send("deleted");
    })

    
  }
const add=(req,res)=>{
  const email=req.params.email;
  const firstname=req.params.firstname;
  const lastname=req.params.lastname;
  const mobile=req.params.mobile;
  const dob=req.params.dob;
  const address=req.params.address;
  pool.query(queries.add,[email,firstname,lastname,mobile,dob,address],(error,results)=>{
    if(error) throw error;
    res.status(200).send("inserted");
  })


  const maildetails = {
    from: 'starsragul@gmail.com',
    to: email,
    subject: 'Invitation',
    //text: `welcome to divum ,your details shoule be entered Successfully , Dear ${firstname}-we happy to share that your appointed as Developer `
    html:`<img src="https://img.freepik.com/free-vector/floral-welcome-lettering-concept_23-2147902326.jpg?w=2000" width="200px" height="200px" boder-radius="10%"/>
    <p>welcome to divum , your details are registered successfully</p>`
    
  };
  
  transporter.sendMail(maildetails, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } 
    else{
      console.log('email sented');
    }
    
  });
  



}
const update=(req,res)=>{
  const {firstname,lastname,mobile,dob,address,email}=req.body;
  pool.query(queries.update,[firstname,lastname,mobile,dob,address,email],(error,results)=>{
    if(error) throw error;
    res.status(200).send("updated");
  })
  const maildetails = {
    from: 'starsragul@gmail.com',
    to: email,
    subject: 'Approved',
    text: `${firstname}-Your profile details are updated successfully`
  };
  
  transporter.sendMail(maildetails, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } 
    //else {
     // console.log('Email sent:', info.response);
    //}
  });
}
const getbyid=(req,res)=>{
  const email=req.params.email;
  pool.query(queries.getbyid,[email],(error,results)=>{
    if(error) throw error;
    res.status(200).json(results.rows);
  })
}
  module.exports={
    getUser,del,add,update,getbyid
  }