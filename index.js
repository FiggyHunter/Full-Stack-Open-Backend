import express from "express";

const app = express();
app.use(express.json());

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

// Fetch all persons
app.get("/api/persons", (request, response) => {
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

app.post("/api/persons/:id", (request, response) => {
  const recievedContact = request.body;
  const newContact = {
    id: Math.floor(Math.random() * 1000000) + 1,
    name: recievedContact.name,
    number: recievedContact.number,
  };
  phonebook.push(newContact);
  return response.status(201).json(newContact);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
