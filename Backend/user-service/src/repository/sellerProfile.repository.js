const SellerProfile = require("../models/sellerProfile.model");

// CREATE
exports.createSellerProfile = async (profileData) => {
  const profile = new SellerProfile(profileData);
  return await profile.save();
};

// READ by userId
exports.getSellerByUserId = async (userId) => {
  return await SellerProfile.findOne({ userId });
};

// UPDATE full seller profile
exports.updateSellerByUserId = async (userId, updateData) => {
  return await SellerProfile.findOneAndUpdate(
    { userId },
    updateData,
    { new: true }
  );
};
