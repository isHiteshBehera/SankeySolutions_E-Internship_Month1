const { _attributes } = require('../configuration/database');
const dbb = require('../configuration/database');
const user = require('../models/user');


const adddetails = async (req,res) => {
    try{
        let info ={
            fname: req.body.fname,
            mname: req.body.mname,
            lname: req.body.lname,
            email: req.body.email,
            phoneno: req.body.phoneno,
            country: req.body.country,
            nameoncard: req.body.nameoncard,
            cardno: req.body.cardno,
            expdate: req.body.expdate,
            cvv: req.body.cvv
    }
    const add = await user.create(info)
    const save = await user.save(info)
    res.send({ message: 'Details added successfully' });
  } 
  catch (err) {
    res.status(500).send({ message: 'Error adding User Details' });
  }  
}

const updatedetails = async (req,res) => {
    try {
        const transaction = await user.findByIdAndUpdate(req.params.userid, {
          fname: req.body.fname,
          mname: req.body.mname,
          lname: req.body.lname,
          email: req.body.email,
          phoneno: req.body.phoneno,
          country: req.body.country,
          nameoncard: req.body.nameoncard,
          cardno: req.body.cardno,
          expdate: req.body.expdate,
          cvv: req.body.cvv
        }, { new: true });

        res.send({ message: 'Details updated successfully' });
      } 

      catch (err) {
        res.status(500).send({ message: 'Error updating Details' });
      }
    };

    const deletedetails = async(req,res) => {
        try {
            await user.findByIdandRemove(req.params.userid);
            res.send({ message: 'Details deleted successfully' });
          } 
          catch (err) {
            res.status(500).send({ message: 'Error deleting transaction' });
          }
        };

        module.exports ={
            adddetails,
            updatedetails,
            deletedetails
        }
    
