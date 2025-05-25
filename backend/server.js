const express = require('express')
const app = express();
const PORT = 4000;
const Admin = require('./Admin/model');
const Company = require('./Company/model');
const Job = require('./Company/Job/model');
const User = require('./User/model');
require('./db');

// app.use(express.json({ extended: true }));
app.use(express.json());

const adminrouter = require('./Admin/controller');
app.use('/admin', adminrouter);
const userrouter = require('./User/controller');
app.use('/user', userrouter);
const companyrouter = require('./Company/controller')
app.use('/company', companyrouter);



const syncModels = async () => {
    try {
        await Admin.sync();
        await Company.sync();
        await Job.sync();
        await User.sync();
        console.log('All tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

syncModels();

app.listen(PORT, () => {
    console.log(`Server is listening on port no. ${PORT}`);
});




// for authentication or roles

// getAuth = function (req, res, next) {
//     if(req.user) { 
//       db.getPerms({role_id: req.user.role_id, resource_id: req.resource.id})
//          .then(function(perms){
//             var allow = false;
//             //you can do this mapping of methods to permissions before the db call and just get the specific permission you want. 
//             perms.forEach(function(perm){
//                 if (req.method == "POST" && perms.create) allow = true;
//                 else if (req.method == "GET" && perms.read) allow = true;
//                 else if (req.method == "PUT" && perms.write) allow = true;
//                 else if (req.method == "DELETE" && perm.delete) allow = true;
  
//             })
//             if (allow) next();
//             else res.status(403).send({error: 'access denied'});
//          })//handle your reject and catch here
//      } else res.status(400).send({error: 'invalid token'})
//   }