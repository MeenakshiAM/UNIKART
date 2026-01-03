const SellerProfile = require("../models/sellerProfile.model");

exports.createSellerProfile = async (profileData) => {
  const profile = new SellerProfile(profileData);
  return await profile.save();
};

exports.getSellerProfileByUserId = async (userId) => {
  return await SellerProfile.findOne({ userId });
};
exports.updateSellerProfileStatus = async (userId, status) => {
    return await SellerProfile.findOneAndUpdate(
        { userId },
        { status },
        { new: true }
    );
};