import express from "express";
import morgan from "morgan";
import cors from "cors";
import Contact from "./models/contact.js";

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };

// Morgan token
morgan.token("requestData", function (req, res) {
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
  await Contact.findOneAndUpdate({ _id: id }, { number: newNumber });
  return await Contact.findOne({ _id: id });
};

// Fetch all persons
app.get("/api/persons", (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts);
  });
});

// Info endpoint
app.get("/info", (request, response) => {
  response.send(
    `<p> Phonebook has info for ${
      phonebook.length
    } people </p> <p> ${new Date()} </p>`
  );
});

// Fetch user by ID
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  Contact.findById(request.params.id)
    .then((note) => {
      response.json(note);
    })
    .catch((e) => response.status(404).json({ error: e }));
});

// Delete user
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((number) => number.id === id);
  if (person) {
    phonebook = phonebook.filter((number) => number.id !== id);
    return response.status(204).end();
  }
  return response.status(404).end();
});

// Add a new user
app.post("/api/persons/", async (request, response) => {
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
    .catch((e) => console.log(e));
});

app.put("/api/persons/:id", async (request, response) => {
  const { number, id } = request.body;
  const foundObject = await updatePersonById(id, number);
  if (!foundObject)
    return response.status(404).json({ error: "Contact was not found!" });
  return response.status(201).json(foundObject);
});

app.use(unknownEndpoint);

const PORT = 3037;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
