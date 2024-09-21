const router = require("express").Router();

const {uploadImageToCloudinary, deleteImageFromCloudinary} = require('../utils/cloudinaryMethods.js');
const Complain = require("../models/Complainschema.js");
const mongoose  = require("mongoose");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "erbitservices@gmail.com",
    pass: "rorvwwarciklfgyw",
  },
});

router.put("/update/:id", async (req, res) => {
  
  
    const {status} = req.body;
    const { id } = req.params;
  
    // if(!mongoose.isValidObjectId(id)) return res.status(402).json({message: "order id is not valid"})
    if(!status) return res.status(402).json({message: "status is requires"})

  
    try {
      const order = await Complain.findByIdAndUpdate(id, {status:status},{new: true});
      // const emailHTML = createOrderTemplate(order)
  
      // sendEmail({
      //   to: order.userInfo.email,
      //   subject: "Order Confirmation",
      //   emailhtml: emailHTML,
      //   emailtext: emailHTML
      // })
  
      res.status(200).json({message: `order status is successfully updated to ${status}`});
    } catch (err) {
      console.log(err)
      res.status(500).json({message: "internal server error"});
    }
  });



router.post("/", async (req, res) => {
  const id = mongoose.Types.ObjectId();
  console.log(id);
  console.log("started");
  console.log(req.body.library);
  try {
    
    
    
    const savedProduct = await Complain.create({ ...req.body.library, _id: id });
    console.log('save');
    
    if (savedProduct) {
      console.log(savedProduct.email);
      
            const mailOptions={
                form:"erbitservices@gmail.com",
                to:`${savedProduct.email},patelmihir2712005@gmail.com`,
                subject:"Complain received",
                text:` We Received New Complain Of ${savedProduct.lname} facing issues and it's decripstion is it :-  ${savedProduct.problemstatement} `
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    return res.status(400).json({msg:"error sending mail"});
                    }else{
                        res.status(200).json({msg:"password reset link sent to your email"});
                    }
            })
        }
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log("ohhno",err);
    
    if (err.name === "ValidationError") {
      if (err.name == "ValidationError") {
        for (field in err.errors) {
          return res
            .status(400)
            .json({ sucess: false, message: err.errors[field].message });
        }
      }
    }
    if (err.code === 11000) {
      const dublicate = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        message: ` A product already exist with the same ${dublicate}`,
      });
    }
    return res.status(500).json({ message: "internal server Error" });
  }
});
router.get("/:lname", async (req, res) => {
 

   try {
     const data = await Complain.findOne({lname:req.params.lname});

     res.status(200).json(data);
     console.log("done");
     console.log(data);
   } catch (error) {
     console.log(error);
     res.status(400).json({ error: "internal servr error" });
   }
});
router.get("/", async (req, res) => {
 

   try {
     const data = await Complain.find();

     res.status(200).json(data);
     console.log("done");
     console.log(data);
   } catch (error) {
     console.log(error);
     res.status(400).json({ error: "internal servr error" });
   }
});


module.exports = router;