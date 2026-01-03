const userRepo = require("../repository/user.repository");
const sellerRepo = require("../repository/sellerProfile.repository");

// -------- Validation Functions --------
function isValidRegisterNumber(registerNumber) {
  const pattern = /^LBT(2[0-6])(IT|CS|EC|ER|CV)\d{3}$/;
  return pattern.test(registerNumber);
}

function isValidAge(dob) {
  if (!dob) return false;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18 && age <= 25;
}

const allowedDepartments = ["IT", "CS", "EC", "ER", "CV"];

// -------- Services --------
exports.registerUser = async ({ name, email, password, registerNumber, dateOfBirth, department }) => {
  // Check if user exists
  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) throw new Error("Email already exists");

  // Registration number validation
  if (!isValidRegisterNumber(registerNumber)) throw new Error("Invalid registration number");

  // Age validation
  if (!isValidAge(dateOfBirth)) throw new Error("Age must be between 18 and 25");

  // Department validation
  if (!allowedDepartments.includes(department)) throw new Error("Invalid department");

  // Create user
  const newUser = await userRepo.createUser({
    name,
    email,
    password,
    registerNumber,
    dateOfBirth,
    department,
    isSeller: false
  });

  return newUser;
};

exports.registerSeller = async ({ userId, shopName, shopDescription, agreedToCommission }) => {
  // Check if user exists
  const user = await userRepo.getUserById(userId);
  if (!user) throw new Error("User not found");

  // Already a seller?
  if (user.isSeller) throw new Error("User is already a seller");

  // Create seller profile with pending status
  const profile = await sellerRepo.createSellerProfile({
    userId,
    shopName,
    shopDescription,
    agreedToCommission,
    status: "PENDING"
  });

  // Automatically approve if validations passed (example)
  // Here you can add extra checks later
  profile.status = "ACTIVE";
  await profile.save();

  // Update user to mark as seller
  user.isSeller = true;
  await user.save();

  return { user, profile };
};
 


