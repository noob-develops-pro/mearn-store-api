const errorHandler = (err, req, res) => {
  console.error(err.message)
  res.status(500).json({ message: 'Something went wrong' })
}

export default errorHandler
