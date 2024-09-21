const express=require('express');
const requestRouter = express.Router();
// const {uploadImageToCloudinary, deleteImageFromCloudinary} = require('../utils/cloudinaryMethods.js');
const mongoose  = require("mongoose");
const Request = require('../models/request-model.js');
// const {createOrderTemplate} = require("../helpers/orderConfrimation");



requestRouter.post("/",  async (req, res) => {

    const id = mongoose.Types.ObjectId()
    console.log(id)
    console.log('data',req.body);
    console.log('libraray',req.body.library);

    try {
    
      
      const savedProduct = await Request.create({...req.body.library, _id: id})
      res.status(200).json(savedProduct);
    } catch (err) {
      if (err.name === "ValidationError") {
        if (err.name == 'ValidationError') {
          for (field in err.errors) {
            return res.status(400).json({sucess: false,message: err.errors[field].message}); 
          }
        }
      } 
      if(err.code === 11000){
        const dublicate = Object.keys(err.keyPattern)[0];
        return res.status(400).json({message: `A product already exist with the same ${dublicate}`}); 
      }
      return res.status(500).json({message: "internal server Error"});
    }
  });

requestRouter.get("/",  async (req, res) => {
    try {
      const savedProduct = await Request.find()
      res.status(200).json({savedProduct,message:'dataget'});

    } catch (err) {
      if (err.name === "ValidationError") {
        if (err.name == 'ValidationError') {
          for (field in err.errors) {
            return res.status(400).json({sucess: false,message: err.errors[field].message}); 
          }
        }
      } 
      if(err.code === 11000){
        const dublicate = Object.keys(err.keyPattern)[0];
        return res.status(400).json({message: `A product already exist with the same ${dublicate}`}); 
      }
      return res.status(500).json({message: "internal server Error"});
    }
  });

// requestRouter.put("/status/:id", async (req, res) => {
  
  
//     const {status} = req.body;
//     const { id } = req.params;
  
//     // if(!mongoose.isValidObjectId(id)) return res.status(402).json({message: "order id is not valid"})
//     if(!status) return res.status(402).json({message: "status is requires"})

  
//     try {
//       const order = await Request.findByIdAndUpdate(id, {status:status},{new: true});
//       // const emailHTML = createOrderTemplate(order)
  
//       // sendEmail({
//       //   to: order.userInfo.email,
//       //   subject: "Order Confirmation",
//       //   emailhtml: emailHTML,
//       //   emailtext: emailHTML
//       // })
  
//       res.status(200).json({message: order status is successfully updated to ${status}});
//     } catch (err) {
//       console.log(err)
//       res.status(500).json({message: "internal server error"});
//     }
//   });

  

module.exports =requestRouter;