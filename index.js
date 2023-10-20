import express from "express";
import morgan from "morgan";
import cors from "cors";
import Contact from "./models/contact.js";
import errorHandler from "./middleware/errorHandler.js";
import Person from "./models/contact.js";

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };

// Morgan token
morgan.token("requestData", function (req) {
  return JSON.stringify(req.body);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :requestData"
  )
);

const checkIfPersonExistsByName = async (name) =>
  (await Contact.findOne({ name })) ? true : false;

// Finds, updates, and returns the person
const updatePersonById = async (id, newNumber) => {
  await Contact.findOneAndUpdate(
    { _id: id },
    { number: newNumber },
    { runValidators: true }
  );
  return await findPersonById(id);
};

const findPersonById = async (id) => {
  const person = await Contact.findOne({ _id: id });

  if (!person) return person;

  const { _id, name, number } = person;
  return { id: _id, name, number };
};

// Fetch all persons
app.get("/api/persons", (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts);
  });
});

// Info endpoint
app.get("/info", (request, response) => {
  response.send(` <p> ${new Date()} </p>`);
});

// Fetch user by ID
app.get("/api/persons/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const person = await findPersonById(id);
    if (!person) return response.status(404).json("Could not find person!");
    return response.json(person);
  } catch (error) {
    next(error);
  }
});

// Delete user
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

// Add a new user
app.post("/api/persons/", async (request, response, next) => {
  const recievedContact = await request.body;

  if (!recievedContact.name)
    return response.status(400).json({
      error: "You need to provide a name for the person you are trying to add",
    });
  if (!recievedContact.number)
    return response.status(400).json({
      error:
        "You need to provide a number for the person you are trying to add",
    });

  if (await checkIfPersonExistsByName(recievedContact.name))
    return response.status(409).json({
      error: "The person is already added!",
    });

  const contact = new Contact({
    name: recievedContact.name,
    number: recievedContact.number,
  });

  contact
    .save()
    .then((savedContact) => {
      const { name, number, _id } = savedContact;
      return response.status(201).json({ name, number, id: _id });
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", async (request, response, next) => {
  const { number, id } = request.body;
  let foundObject;
  try {
    foundObject = await updatePersonById(id, number);
  } catch (error) {
    next(error);
    return;
  }
  if (!foundObject)
    return response.status(404).json({ error: "Contact was not found!" });
  return response.status(201).json(foundObject);
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = 3037;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
