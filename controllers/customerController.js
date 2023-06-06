const Customer = require('../models/customers');
const StreetVendor = require('../models/vendors');
const getNearbyStalls = async(req,res) => {
    const vendors = await StreetVendor.find({}).exec();
    const user = req.userId;
  try {
    // Find the vendor by ID
    console.log(user);
    const customer  = await Customer.findOne({ userId: user });
    console.log(customer);
    if (!customer) {
      return res.status(404).json({ message: 'customer not found' });
    }
console.log(vendors);
    res.render('Users/user', { customer: customer, vendors: vendors });
}catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Failed to fetch user' });
}
};
const openMap = async(req,res) => {

};
module.exports = {
    getNearbyStalls: getNearbyStalls,
    openMap: openMap
};