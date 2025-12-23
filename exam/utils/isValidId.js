const isValidId = (id, data) => {
    return id && !data[id].isDeleted;
}

module.exports = isValidId;