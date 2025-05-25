// const { Sequelize } = require("sequelize");
const express = require("express");
const router = express.Router();
const Company = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {isAdmin} = require('../middleware/auth')

// Company Registration
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    mobile,
    address,
    website,
    industry,
    description,
    logo,
  } = req.body;

  try {
    // Check if the company already exists
    const existingCompany = await Company.findOne({ where: { email } });
    if (existingCompany) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Company with this email already exists.",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newCompany = await Company.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      address,
      website,
      industry,
      description,
      logo,
      is_verified: false,
    });

    return res
      .status(201)
      .json({
        status: true,
        message: "Company registered successfully, awaiting admin approval.",
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong!" });
  }
});

//admin approves
router.put("/approve/:companyId", isAdmin, async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findByPk(companyId);

    if (!company) {
      return res
        .status(404)
        .json({ status: false, message: "Company not found" });
    }

    if (company.is_verified) {
      return res
        .status(400)
        .json({ status: false, message: "Company is already approved" });
    }

    company.is_verified = true;
    await company.save();

    return res
      .status(200)
      .json({ status: true, message: "Company approved successfully" });
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong!" });
  }
});

// router.put('/approve/:companyId', isAdmin, async (req, res) => {
//   const { companyId } = req.params;

//   try {
//     const company = await Company.findByPk(companyId);

//     if (!company) {
//       return res.status(404).json({ status: false, message: 'Company not found' });
//     }

//     if (company.is_verified) {
//       return res.status(400).json({ status: false, message: 'Company is already approved' });
//     }

//     company.is_verified = true;
//     await company.save();

//     return res.status(200).json({ status: true, message: 'Company approved successfully' });
//   } catch (error) {
//     return res.status(500).json({ status: false, message: 'Something went wrong!' });
//   }
// });


//admin rejects

router.put("/rejected/:companyId", isAdmin, async (req, res, next) => {
  const { companyId } = req.params;
  try {
    const company = await Company.findByPk(companyId);

    if (!company) {
      return res
        .status(404)
        .json({ status: false, message: "Company not found" });
    }
    if (!company.is_verified) {
      return res
        .status(400)
        .json({ status: false, message: "Company is already rejected" });
    }

    company.is_verified = false;
    await company.save();
    return res
      .status(200)
      .json({ status: true, message: "Company rejected successfully" });


  } catch (error) {
    res
      .sendStatus(500)
      .json({ status: false, message: "Something went Wrong" });
  }
});

//login the company
router.get("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ where: { email } });

    if (!company) {
      return res
        .status(401)
        .json({ message: "Invalid credentials, Company Not Found" });
    }
    const isPasswordValid = await bcrypt.compareSync(password, company.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials, Password Incorrect" });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res
        .status(500)
        .json({ message: "Some Error Occurred. JWT not Found" });
    }
    const token = jwt.sign({ id: company.id }, process.env.JWT_SECRET);

    res
      .status(200)
      .json({
        status: true,
        message: `Admin ${company.email} login successfully`});
  } catch (error) {
    res.status(500).send({ status: false, message: "Something went wrong!" });
  }
});

module.exports = router;
