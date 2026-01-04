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

// ------------------ USER REGISTRATION ------------------
exports.registerUser = async ({
  name,
  email,
  password,
  registerNumber,
  dateOfBirth,
  department
}) => {
  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) throw new Error("Email already exists");

  if (!isValidRegisterNumber(registerNumber))
    throw new Error("Invalid registration number");

  if (!isValidAge(dateOfBirth))
    throw new Error("Age must be between 18 and 25");

  if (!allowedDepartments.includes(department))
    throw new Error("Invalid department");

  return await userRepo.createUser({
    name,
    email,
    password,
    registerNumber,
    dateOfBirth,
    department,
    isSeller: false
  });
};

// ------------------ SELLER REGISTRATION ------------------
exports.registerSeller = async ({
  userId,
  shopName,
  shopDescription,
  agreedToCommission
}) => {
  const user = await userRepo.getUserById(userId);
  if (!user) throw new Error("User not found");

  if (user.isSeller)
    throw new Error("User already registered as seller");

  // 🔥 Automated verification
  const isVerified =
    isValidRegisterNumber(user.registerNumber) &&
    isValidAge(user.dateOfBirth) &&
    allowedDepartments.includes(user.department) &&
    agreedToCommission === true;

  const status = isVerified ? "ACTIVE" : "PENDING";

  const profile = await sellerRepo.createSellerProfile({
    userId,
    shopName,
    shopDescription,
    agreedToCommission,
    status
  });

  // mark seller intent
  await userRepo.updateUserById(userId, { isSeller: true });

  return {
    message: isVerified
      ? "Seller activated successfully"
      : "Seller registered, pending verification",
    profile
  };
  

};



exports.getAllUsers = async () => {
  return await userRepo.getAllUsers();
};
