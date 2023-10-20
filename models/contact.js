import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;

console.log(`Connecting to: ${url}`);

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => console.log("\n Connected to DB! \n"))
  .catch((error) => console.log("error connecting to MongoDB:", error.message));

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Make 'name' field required
    minlength: 3, // Set a minimum length of 3 characters
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (value) {
        // Use a regular expression to check the format
        return /^\d{2,3}-\d+$/.test(value);
      },
      message:
        "The number field must match the format: XX-XXXXX (where X is a digit).",
    },
  },
});

contactSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Contact", contactSchema);

export default Person;
