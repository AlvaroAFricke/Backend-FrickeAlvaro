import express from 'express'
import productosRouter from './router/productosRouter.js'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.use(express.json())

app.use('/api/productos', new productosRouter())

const PORT = 8080
app.listen(PORT, () => {
    console.log('Corriendo ...')
})