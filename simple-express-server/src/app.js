require("dotenv").config({ quiet: true });
const experss = require("express");
const { randomUUID } = require("node:crypto");
const bodyParser = require("body-parser");
const readFile = require("../utils/readFile");
const writeFile = require("../utils/writeFile");
const isValidKey = require("./middle_wares/checkApiKey");
const isValidBody = require("./middle_wares/checkBody");

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "127.0.0.1";

const app = experss();

app.use(bodyParser.json());

app.get("/tasks", async (req, res) => {
    const data = await readFile();

    if (data) {
        res.status(200).json(data);
    } else {
        res.status(500).json({ message: "Oops, internal server error" });
    }
});

app.get("/tasks/:id", (req, res) => {
    console.log(req.params.id);
});

app.post("/tasks", isValidKey, isValidBody, async (req, res) => {
    const { title, description } = req.body;
    const data = await readFile();

    if (!data) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    const newData = { title, description };
    newData.id = randomUUID();
    newData.completed = false;
    newData.createdAt = new Date();
    data.push(newData);

    const isSuccess = await writeFile(data);

    if (isSuccess) {
        res.status(201).json({ message: "Created" });
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Server run on ${HOST}:${PORT}`);
});