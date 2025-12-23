const parseUrl = url => {
    return url.split("/").filter(Boolean);
}

module.exports = parseUrl;