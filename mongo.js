import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const password = process.env.DB_PASS;
const username = process.env.DB_USER;

let recievedName = "";
let recievedNumber = "";
process.argv.forEach((val, index) => {
  if (index === 2) recievedName = val;
  if (index === 3) recievedNumber = val;
});

const url = `mongodb+srv://${username}:${password}@clusterfso7.fvfv3pa.mongodb.net/Phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url).then(() => console.log("\n Connected to DB! \n"));

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

const person = new Contact({
  name: recievedName,
  number: recievedNumber,
});

person.save().then((result) => {
  console.log(`\n Added ${recievedName} to the phonebook! \n`);
  Contact.find({}).then((result) => {
    console.log("\nphonebook: \n");
    result.forEach((note) => {
      let { name, number } = note;
      console.log(name, number);
    });
    console.log("\n");
    mongoose.connection.close();
  });
});
