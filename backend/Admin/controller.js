// // const express = require('express')
// // const router = express.Router()
// // const Admin = require('./model')
// // const { Sequelize } = require('sequelize')
// // const bcrypt = require('bcrypt');
// // const jwt = require('jsonwebtoken')



// // //register the admin
// // router.post('/admin/register', async (req, res) => {
// //     const { name, email, phoneNo, username, password } = req.body;
// //     try {
// //         const adminExist = await Admin.findOne({ username });
// //         if (adminExist) {
// //             res.status(400).send({ status: false, message: `Admin ${adminExist.username} already exist` })
// //         }

// //         const hashedPassword = bcrypt.hashSync(password, 8);

// //         const newAdmin = await Admin.create({ name, email, phoneNo, username, password: hashedPassword });

// //         if(newAdmin){
// //             res.status(200).send({status: true , message: 'Admin Created Successfully.'})
// //         }
// //         else{
// //             res.status(400).send({status: false , message:'Something went wrong, Admin not created'});
// //         }

// //     }
// //     catch (error) {
// //         res.status(500).send({ status: false, message: 'Something went wrong!' });
// //     }
// // });

// // //login the admin
// // router.get('/admin/login', async (req, res) => {
// // const {username , password} = req.body;

// // try{
// //  const admin = await Admin.findAll({ where : {username} });

// //  if(!admin){
// //     return res.status(401).json({ message: 'Invalid credentials, Username Not Found' });
// //  }
// //  const isPasswordValid = bcrypt.compareSync(password, company.password);
// //  if (!isPasswordValid) {
// //      return res.status(401).json({ message: 'Invalid credentials, Password Incorrect' });
// //  }

// //  const jwtSecret = process.env.JWT_SECRET;

// //  if (!jwtSecret) {
// //     return res.status(500).json({ message: 'Some Error Occurred. JWT not Found' })
// // }
// // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

// // res.status(200).json({status:true, message: `Admin ${admin.username} login successfully`, token})

// // }
// // catch(error){
// //     res.status(500).send({ status: false, message: 'Something went wrong!' });
// // }
// // });

// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Admin = require('./model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // Register the admin
// router.post('/admin/register', async (req, res) => {
//     const { name, email, phoneNo, username, password } = req.body;
//     try {
//         const adminExist = await Admin.findOne({ where: { username } });
//         if (adminExist) {
//             return res.status(400).send({ status: false, message: `Admin ${adminExist.username} already exists` });
//         }

//         const hashedPassword = bcrypt.hashSync(password, 8);
//         const newAdmin = await Admin.create({ name, email, phoneNo, username, password: hashedPassword });

//         if (newAdmin) {
//             return res.status(200).send({ status: true, message: 'Admin Created Successfully.' });
//         } else {
//             return res.status(400).send({ status: false, message: 'Something went wrong, Admin not created' });
//         }
//     } catch (error) {
//         return res.status(500).send({ status: false, message: 'Something went wrong!' });
//     }
// });

// // Login the admin
// router.post('/admin/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const admin = await Admin.findOne({ where: { username } });
//         if (!admin) {
//             return res.status(401).json({ message: 'Invalid credentials, Username Not Found' });
//         }

//         const isPasswordValid = bcrypt.compareSync(password, admin.password);  
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid credentials, Password Incorrect' });
//         }

//         const jwtSecret = process.env.JWT_SECRET;
//         if (!jwtSecret) {
//             return res.status(500).json({ message: 'Some Error Occurred. JWT not Found' });
//         }

//         const token = jwt.sign({ id: admin.id }, jwtSecret);

//         return res.status(200).json({
//             status: true,
//             message: `Admin ${admin.username} logged in successfully`,
//             token
//         });
//     } catch (error) {
//         return res.status(500).send({ status: false, message: 'Something went wrong!' });
//     }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Admin = require('./model');  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register the admin
router.post('/register', async (req, res) => {
    const { name, email, phoneNo, username, password } = req.body;

    try {
      
        const adminExist = await Admin.findOne({ where: { username } });
        if (adminExist) {
            return res.status(400).json({ status: false, message: `Admin ${adminExist.username} already exists.` });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const newAdmin = await Admin.create({ name, email, phoneNo, username, password: hashedPassword });

        if (newAdmin) {
            return res.status(201).json({ status: true, message: 'Admin created successfully.' });
        } else {
            return res.status(400).json({ status: false, message: 'Admin not created, something went wrong.' });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Something went wrong!' });
    }
});

// login admin
router.get('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
       
        const admin = await Admin.findOne({ where: { username } });

        if (!admin) {
            return res.status(401).json({ status: false, message: 'Invalid credentials, username not found.' });
        }

     
        const isPasswordValid = bcrypt.compareSync(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: false, message: 'Invalid credentials, password incorrect.' });
        }

        
        const jwtSecret = process.env.JWT_SECRET || 'secret';  
        const token = jwt.sign({ id: admin.id }, jwtSecret, { expiresIn: '1h' });

        return res.status(200).json({
            status: true,
            message: `Admin ${admin.username} logged in successfully.`,
            token,
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Something went wrong!' });
    }
});

module.exports = router;

