import express from "express";
import morgan from "morgan";
import cors from "cors";

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

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :requestData"
  )
);

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const checkIfPersonExistsByName = (name) =>
  phonebook.find((number) => number.name === name) ? true : false;

  const getPersonById = (id) =>
  phonebook.find((number) => Number(number.id) === id);
// Fetch all persons
app.get("/api/persons", (request, response) => {
  console.log(request);
  response.json(phonebook);
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
  const person = phonebook.find((number) => number.id === id);
  if (person) return response.status(200).json(person);
  return response.status(404).end();
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
app.post("/api/persons/", (request, response) => {
  const recievedContact = request.body;

  if (!recievedContact.name)
    return response.status(400).json({
      error: "You need to provide a name for the person you are trying to add",
    });
  if (!recievedContact.number)
    return response.status(400).json({
      error:
        "You need to provide a number for the person you are trying to add",
    });

  if (checkIfPersonExistsByName(recievedContact.name))
    return response.status(409).json({
      error: "The person is already added!",
    });

  const newContact = {
    id: Math.floor(Math.random() * 1000000) + 1,
    name: recievedContact.name,
    number: recievedContact.number,
  };
  phonebook.push(newContact);
  return response.status(201).json(newContact);
});

app.put("/api/persons/:id", (request, response) => {
  const {number, id} = request.body;
  const foundObject = getPersonById(id);
  foundObject.number = number; 
  console.log(foundObject);
  return response.status(201).json(foundObject);
});


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3037;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
