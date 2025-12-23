const METHODS = require("../../../constants/methods");

const isValidEmail = (email, data, id, method) => {
    if (method === METHODS.POST) {
        for (const dataItem of data) {
            if (email === dataItem.email) return false;
        }

        return true;
    }

    if (method === METHODS.PUT || method === METHODS.PATCH) {
        const size = data.length;

        for (let i = 0; i < size; ++i) {
            if (i == id) continue;

            if (email === data[i].email) return false;
        }

        return true;
    }
};

module.exports = isValidEmail;