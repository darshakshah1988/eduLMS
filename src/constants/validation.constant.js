const VALIDATION_MESSAGE = Object.freeze({
  fullname: { require: "Full name is required" },
  email: {
    require: "Email address is required",
    invalid: "Enter valid email address",
  },
  password: {
    require: "Password is required",
    invalid:
      "Must Contain 8 Characters, a Uppercase, a Lowercase, a Number and a Special Case Character",
  },
  currentPassword: {
    require: "Current password is required",
  },
  confirmPassword: {
    require: "Confirm password is required",
    invalid: "Confirm password not matched",
  },
  firstName: {
    require: "First name is required",
  },
  lastName: {
    require: "Last name is required",
  },
  phone: {
    require: "Phone number is required",
    invalid: "Enter valid phone number",
  },
  contact: {
    require: "Contact number is required",
    invalid: "Enter valid contact number",
  },
  mobile: {
    require: "Mobile number is required",
    invalid: "Enter valid mobile number",
  },
  jobAddress: {
    require: "Job address is required",
    invalid: "Please select valid job address",
  },
  jobName: {
    require: "Job name is required",
  },
  jobType: {
    require: "Job type is required",
  },
  stories: {
    require: "Stories is required",
    number: "Enter valid stories",
    nonZero: "Stories must be one or more",
  },
  roofSlop: {
    require: "Slop is required",
  },
  scheduleDate: {
    require: "Schedule date is required",
  },
  startTime: {
    require: "Start time is required",
  },
  endTime: {
    require: "End time is required",
  },
  assignTo: {
    require: "Please select pilot for assign",
  },
  obstaclesHeights: {
    minHeight: "Lowest drone flight must be greater than or equal to 25 feets",
    maxHeight: "Highest drone flight must be less than or equal to 400 feets",
  },
  airspaceHeight: {
    minHeight:
      "Lowest airspace height must be greater than or equal to 25 feets",
    maxHeight:
      "Highest airspace height must be less than or equal to 400 feets",
  },
});

export default VALIDATION_MESSAGE;
