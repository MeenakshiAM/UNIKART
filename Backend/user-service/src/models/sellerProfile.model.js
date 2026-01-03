const mongoose = require("mongoose");

const sellerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  shopName: { type: String, required: true },
  shopDescription: { type: String },
  status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
  agreedToCommission: { type: Boolean, default: false },
  shopImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("SellerProfile", sellerProfileSchema);
