module.exports.handleErrors = (err, req, res) => {
  res.status(500).send({ message: 'An internal server error ocurred' });
};
