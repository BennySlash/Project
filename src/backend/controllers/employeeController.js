const Employee = require("../models/employee");
const { isValidEmail, isValidText } = require("../util/validation");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../util/errorhandler");
const { createJSONToken, isValidPassword } = require("../util/auth");

// Create an employee with Email and Name => /api/signup
exports.createEmployee = catchAsyncErrors(async (req, res, next) => {
  console.log("here");
  const data = req.body;
  const existingEmail = await Employee.find({ email: req.body.email });
  // console.log(existingEmail.length);

  if (!isValidEmail(data.email)) {
    console.log("invalid Email");
    return next(new ErrorHandler("Invalid Email.", 401));
    // res.status(401).json({
    //   sucess: false,
    //   message: "Invalid Email",
    // });
  } else if (existingEmail.length !== 0) {
    console.log("Email aleady exists");
    return next(new ErrorHandler("Email already exists.", 401));
    // res.status(401).json({
    //   sucess: false,
    //   text: "Email/User aleady exists",
    // });
  } else {
    const employee = await Employee.create({
      name: req.body.name,
      email: req.body.email,
      date: new Date(),
    });

    res.status(201).json({
      success: true,
      employee,
    });
  }
});

exports.loginEmployee = catchAsyncErrors(async (req, res, next) => {
  const employeeisRegistered = await Employee.find({ email: req.body.typed });
  if (employeeisRegistered.length !== 0) {
    const authToken = createJSONToken(employeeisRegistered.email);
    res.status(201).json({
      message: "User Logedin.",
      user: employeeisRegistered[0].name,
      token: authToken,
    });
  } else {
    res.status(401).json({
      message: "please register first",
    });
  }
});
