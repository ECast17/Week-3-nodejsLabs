const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
    {
    "firstName":"Jon",
    "lastName":"Lovato",
    "email":"jonlovato@theworld.com",
    "DOB":"10/10/1995"
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // The R in CRUD
  res.send(JSON.stringify({users},null,4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // adding code from exercise 3
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
  res.send(filtered_users);
});


// POST request: Create a new user, the C in CRUD = create
router.post("/",(req,res)=>{
  users.push({"firstName":req.query.firstName,"lastName":req.query.lastName,"email":req.query.email,"DOB":req.query.DOB});
  res.send("The user" + (' ')+ (req.query.firstName) + " Has been added!")
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0];
        let DOB = req.query.DOB;
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        if (DOB) {
            filtered_user.DOB = DOB
        }
        if (firstName) {
            filtered_user.firstName = firstName
        }
        if (lastName) {
            filtered_user.lastName = lastName
        }
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
  res.send('User with the email ${email} updated.');
    }
    else{
        res.send("Unable to find user!");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
    users = users.filter((user) => user.email != email);
  res.send('User with the email ${email} deleted.');
});

module.exports=router;
