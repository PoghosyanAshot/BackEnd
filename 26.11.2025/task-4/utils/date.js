const formatFata = (date) => new Date(date).toISOString().split("t")[0];

module.exports = formatFata;
