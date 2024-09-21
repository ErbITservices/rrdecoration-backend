const router = require("express").Router();
const mongoose = require("mongoose");
const Libraraylist = require("../models/Libraraylist.js");
const { verifyAdminWithToken } = require("./tokenVerify");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryMethods.js");

//add new product req: login
router.get("/", async (req, res) => {
  try {
    const library = await Libraraylist.find();

    res.status(200).json(library);
    console.log("done");
    console.log(library);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "internal servr error" });
  }
});
router.get("/:lname", async (req, res) => {
  try {
    
    const library = await Libraraylist.findOne({ lname: req.params.lname });
    
    res.status(200).json(library);
    console.log("done");
    console.log(library);
    
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "internal servr error" });
  }
});
router.post("/", async (req, res) => {
  const id = mongoose.Types.ObjectId();
    console.log(id);
    
      try {
        const data = req.body;
        const newticket = new Libraraylist(data);
        const savedticket = await newticket.save();
        console.log("data save");
        res.status(200).json(savedticket);
        
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  
});
router.post("/check", async (req, res) => {
  const { service, lname } = req.body;
  try {
    const findlibrary = await Libraraylist.findOne({
      lname: lname,
      service: service,
    });
    if (!findlibrary) {
      res.status(201).json({ sucess: false, message: "library not valide" });
    }
    const date = new Date("20 December 2025 14:48");
    console.log(date);
    console.log(Date.now);
    if (date >= Date.now()) {
      res
        .status(201)
        .json({ sucess: true, message: "create warranty", findlibrary });
    } else {
      res.status(201).json({ sucess: false, message: " warranty expire" });
    }
  } catch (h) {}
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const reminder = await Libraraylist.findOneAndDelete({ _id: id });
    if (!reminder) {
      return res.status(404).json({ message: "No Menu with this ID" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "person deleted success" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/setdate/:id",  async (req, res) => {
  
  
  const { startdate ,enddate,service,amount } = req.body;
  const { id } = req.params;

  if(!mongoose.isValidObjectId(id)) return res.status(402).json({message: "order id is not valid"})
  if(!startdate) return res.status(402).json({message: "startdate is requires"})

  try {
    const order = await Libraraylist.findByIdAndUpdate(
      id,
      {
        startdate: startdate,
        enddate: enddate,
        service: service,
        amount: amount,
      },
      { new: true }
    );
    

    res.status(200).json({message:` date status is successfully updated startdate=${startdate}and enddate=${enddate},order`});
  } catch (err) {
    console.log(err)
    res.status(500).json({message: "internal server error"});
  }
});
//update products


//delete product req:login


//get specific product info


//GET ALL PRODUCTS




module.exports = router;
