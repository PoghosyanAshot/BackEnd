require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const isValidId = require("./utils/isValidId");
const readFile = require("./utils/readFile");
const writeFile = require("./utils/writeFile");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "127.0.0.1";

app.get("/tasks", (req, res) => {
    try {
        const data = readFile();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: "Oops, internal server error" });
    }
});

app.get("/tasks:id", (req, res) => {
    try {
        const id = req.params.id.split(":").filter(Boolean);
        const data = readFile();
        if (isValidId(id, data)) {
            res.status(200).send(data[id]);
        } else {
            res.status(404).send("Oops, resource not find");
        }
    } catch (err) {
        res.status(500).send({ message: "Oops, internal server error" });
    }
});

app.post("/tasks", (req, res) => {
    try {
        const data = readFile();
        const body = req.body;
        body.id = data.length;
        body.completed = false;
        body.createdAt = new Date(Date.now()).toString();
        body.isDeleted = false;
        data.push(body);

        writeFile(data);
        res.status(201).send("created");
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: "Oops, internal server error" });
    }
});

app.patch("/tasks:id", (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const data = readFile();

        if (isValidId(id, data)) {
            const { title, description } = body;

            if (title) {
                data[id].title = title;
            }

            if (description) {
                data[id].description = description;
            }

            writeFile(data);
        } else {
            res.status(404).send("Oops, resource not find");
        }
    } catch (err) {
        res.status(500).send({ message: "Oops, internal server error" });
    }
});

app.delete("/tasks:id", (req, res) => {
    try {
        const id = req.params.id;
        const data = readFile();

        if (isValidId(id, data)) {
            data[id].isDeleted = true;
        } else {
            res.status(404).send("Oops, resource not find");
        }
    } catch (err) {
        res.status(500).send({ message: "Oops, internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server run on ${HOST}:${PORT}`);
});
