const StreetVendor = require('../models/vendors');

// const { ObjectId } = require('mongodb');

const createMenu = async(req,res) =>{
  const vendorId = req.userId;
  const menuItem = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  };
  try {
   
    // Find the vendor by ID
    // const vendor = await StreetVendor.findOne({ userId: ObjectId(vendorId) });
    const vendor = await StreetVendor.findOne({ userId: vendorId });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    // Add the menu item to the vendor's menu array
    vendor.menu.push(menuItem);
  
    // Save the updated vendor document
    await vendor.save();
  
    res.status(200).json({ message: 'Menu item added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add menu item' });
  }
};

const getMenu = (req,res) => {

};
const displayVendor = async(req,res) => {
  const vendorId = req.userId;
  let vendor;
  try {
    // Find the vendor by ID
    console.log(vendorId);
    vendor = await StreetVendor.findOne({ userId: vendorId });
    console.log(vendor);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.render('vendors/vendor', { vendor });
}catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Failed to fetch vendor' });
}
console.log(vendor);
};
const updateLocation = async(req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // Find the vendor in the database by any identifier (e.g., vendor ID, username)
    const vendor = await StreetVendor.findOne({ userId: req.userId });

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    // Update the vendor's location
    vendor.latitude = latitude;
    vendor.longitude = longitude;

    // Save the updated vendor
    await vendor.save();

    // return res.status(200).json({ message: 'Location updated successfully' });
    res.redirect('/vendors/vendorHome');
  } catch (error) {
    console.log('Error updating vendor location:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
module.exports = {
createMenu: createMenu,
displayVendor: displayVendor,
updateLocation: updateLocation
};
