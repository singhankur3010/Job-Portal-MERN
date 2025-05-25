// const express = require('express')
// const router = express.Router();
// const User = require('./model')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')


// //register the user
// router.post('/register', async (req, res) => {
//     const { name, email, phoneNo, username, password } = req.body;

//     try {
//         const userExist = await User.findOne({ username });
//         if (userExist) {
//             return res.status(401).send({ status: false, message: `User ${userExist.username} already exist` });
//         }

//         const hashedPassword = await bcrypt.hash(password, 8);
//         const newUser = await User.create({ name, email, phoneNo, username, password: hashedPassword });

//         if (newUser) {
//             res.status(201).send({ status: true, message: 'User created.' });
//         }
//         else {
//             res.status(400).send({ status: false, message: 'User creation failed' })
//         }
//     } catch (error) {
//         res.status(500).send({ status: false, message: 'Something went wrong!' });
//     }
// });


// // login the user
// router.get('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {

//         const user = await User.findOne({ where: { username } });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials, Username Not Found' });
//         }

//         const isPasswordValid = bcrypt.compareSync(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid credentials, Password Incorrect' });
//         }

//         const jwtSecret = process.env.SECRET_JWT;
//         if (!jwtSecret) {
//             return res.status(500).json({ message: 'Some Error Occurred. JWT not Found' })

//         }
//         const token = jwt.sign({ id: user.id }, jwtSecret)

//         res.status(200).json({status:true, message: `User ${user.username} successfully`, token})

//     }
//     catch (error) {
//         res.status(500).send({ status: false, message: 'Something went wrong' })
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register the user
router.post('/register', async (req, res) => {
    const { name, email, phoneNo, username, password } = req.body;

    try {
       
        const userExist = await User.findOne({ where: { username } });
        if (userExist) {
            return res.status(400).send({
                status: false,
                message: `User ${userExist.username} already exists.`,
            });
        }

      
        const hashedPassword = await bcrypt.hash(password, 8);


        const newUser = await User.create({ name, email, phoneNo, username, password: hashedPassword });

        if (newUser) {
            return res.status(201).send({ status: true, message: 'User created successfully.' });
        } else {
            return res.status(400).send({ status: false, message: 'User creation failed.' });
        }
    } catch (error) {
        console.error(error); 
        return res.status(500).send({ status: false, message: 'Something went wrong.' });
    }
});

// Login the user
router.get('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
       
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials, Username not found.' });
        }

   
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials, Password is incorrect.' });
        }


        const jwtSecret = process.env.SECRET_JWT|| 'secret'; 
   

        const token = jwt.sign({ id: user.id }, jwtSecret); 

        return res.status(200).json({
            status: true,
            message: `User ${user.username} successfully logged in.`,
            token, 
        });
    } catch (error) {
     
        return res.status(500).send({ status: false, message: 'Something went wrong.' });
    }
});

//logout the user
// exports.logout = (req,res) => {
//     req.session.destroy((err) =>{
//        res.redirect('shop/signin');
//     })
// };

router.post('/logout', async (res,req) => {
    try{
         req.session.destroy((err) => {
            res.status(200).json({status:true, message:"Successfully Logout"})
         }
        )
    }
    catch(error){
        res.status(500).send({status:false, message:"Something went wrong"})
    }
})
module.exports = router;