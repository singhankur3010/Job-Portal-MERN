
const jwt = require('jsonwebtoken');
const Admin = require('../Admin/model');
const Company = require('../Company/model');

const isAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findByPk(decoded.id); 

    if (!admin) {
      return res.status(403).json({ message: 'Access denied, Admin role required' });
    }

    
    req.admin = admin;
    // res.status(200).json({message: "company registered"})
    next(); 
    
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { isAdmin };

// const jwt = require('jsonwebtoken');
// const Admin = require('../Admin/model'); // Ensure that the correct path is used

// const isAdmin = async (req, res, next) => {

//   const token = req.header('Authorization')?.replace('Bearer ', '');
  
//   if (!token) {
//     return res.status(401).json({ message: 'Authorization token is required' });
//   }

//   try {
//     // Verify and decode the JWT token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Look up the admin using the ID from the decoded JWT
//     const admin = await Admin.findByPk(decoded.id); 

//     if (!admin) {
//       return res.status(403).json({ message: 'Access denied, Admin role required' });
//     }

//     // Attach the admin data to the request object so it can be accessed in the next middleware
//     req.admin = admin;

//     // Proceed to the next middleware or route handler
//     next(); 

//   } catch (error) {
//     // Catch any errors related to invalid/expired token and send a response
//     console.error(error);  // Useful for debugging
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = { isAdmin };
