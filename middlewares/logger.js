/**
 * ! Membuat method log di console
 * * flow https rest
 * @param {*} req -> next -> next -> next -> res
 * @param {*} res -> next -> next -> next -> req
 * @param {*} next 
 */
const log = (req, res, next) => {
    console.log(new Date().toLocaleDateString(), "=>", req.method, req.originalUrl);
    next()
};

module.exports = log;