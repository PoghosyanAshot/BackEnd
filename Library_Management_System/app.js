"use strict";

require("dotenv").config({ quiet: true });
const express = require("express");
const path = require("node:path");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./src/routes/auth.routes");
const adminRouter = require("./src/routes/admin.routes");
const booksRouter = require("./src/routes/books.routes");
const errorHandler = require("./src/middlwares/errorHandler");
const attachUser = require("./src/middlwares/atatchUser");
const requireAuth = require("./src/middlwares/requireAuth");
const requireAdmin = require("./src/middlwares/requireAdmin");
const HTTP = require("./constants/httpStatus");
const loanService = require("./src/services/loan.service");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(attachUser);

app.use("/", authRouter);
app.use("/", requireAuth, booksRouter);
app.use("/admin", requireAdmin, adminRouter);

app.get("/me/loans", async (req, res, next) => {
    try {
        const userId = req.user.id;
        const loans = await loanService.getLoansForUser(userId);

        res.render("pages/my-loans", {
            title: "My Loans",
            loans,
            currentUser: req.user,
            error: null,
        });
    } catch (err) {
        next(err);
    }
});

// route not found

app.use((req, res) => {
    res.status(HTTP.NOT_FOUND).render("pages/404", {
        title: "Not Found",
        currentUser: req.user || null,
        error: null,
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "127.0.0.1";

app.listen(PORT, HOST, () => {
    console.log(`The server run on ${HOST}:${PORT}`);
});
