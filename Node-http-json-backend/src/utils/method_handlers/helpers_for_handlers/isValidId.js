const isValidId = (id, data) => {
    return (id >= 0 && id < data.length) && !data[id].isDeleted;
}

module.exports = isValidId;