"use strict";

const path = require("node:path");
const multer = require("multer");
const ServerError = require("../utils/serverError");
const { LIMITS, MSG, HTTP_STATUS } = require("../constants/constants");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "public", "uploads"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLocaleLowerCase() || "";
        const safeExt = ext.replace(/[^a-z0-9.]/g, "");

        const unique =
            "avatar-" +
            Date.now().toString(10) +
            "-" +
            Math.random().toString(16).slice(2) +
            safeExt;

        cb(null, unique);
    },
});

const fileFilter = (req, file, cb) => {
    const ok = LIMITS.ALLOWED_IMAGE_MIMETYPES.includes(file.mimetype);

    if (!ok) {
        cb(
            new ServerError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.IMAGE_INVALID_TYPE,
                errors: [MSG.IMAGE_INVALID_TYPE],
            }),
            false
        );
    }

    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: LIMITS.MAX_IMAGE_BYTES,
    },
});

module.exports = upload;
