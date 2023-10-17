import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

process.argv.forEach((val, index) => {
  if (index === 2) recievedName = val;
  if (index === 3) recievedNumber = val;
});

const url = process.env.DB_URL;

console.log(`Connecting to: ${url}`);

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => console.log("\n Connected to DB! \n"))
  .catch((error) => console.log("error connecting to MongoDB:", error.message));

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
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
