const express = require('express')
const productRoutes = require('./routes/productRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()
app.use(express.json())

app.use('/products', productRoutes)
app.use(errorMiddleware)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})