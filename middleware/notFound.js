const notFound = (err, req, res) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Server Error' })
}

export default notFound
