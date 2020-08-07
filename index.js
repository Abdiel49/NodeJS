'use strict'

const  express = require( 'express' )
const bodyParser = require( 'body-parser' )
const mongoose = require('mongoose')

const Product =  require ('./models/product')



const app = express()
 l
const url = 'localhost'
const port = process.env.PORT || 3200

app.use( bodyParser.urlencoded( { extended : false } ) )
app.use( bodyParser.json() )
/*
app.get('/hola/:name', (req, res) => {
    res.send( { message: `hola ${req.params.name}` } )
})   
*/

app.get('/api/product', (req, res) => {
    Product.find( {}, ( err, products) => {
        if ( err )
            return res.status(500).send( { message : `Error al realizar la peticion: ${ err } ` } )
        if ( !products )
            return res.status(404).send( { message : `No existen productos` } )  
        res.status(200).send( { products } )
    })
})

app.get('/api/product/:productId', (req, res) => {
    let productId = req.params.productId 

    Product.findById( productId, ( err, product ) => {
        if ( err )
            return res.status(500).send( { message : `Error al realizar la peticion: ${ err } ` } )
        if ( !product )
            return res.status(404).send( { message : `El producto no existe` } )

        res.status(200).send( { product : product } )
    })
})

app.post('/api/product', (req, res) => {
    console.log( 'POST /api/product' )
    console.log( req.body )

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save ( (err, productStored) => {
        if (err)    res.status(500).send( { message : `Error al salvar en la base de datos ${err}` } )

        res.status(200).send( { product : productStored                                                                                                                                                                                                                                                                      } )
    } )
    /*console.log(req.body)
    res.status(200).send({ message : `el producto se ha recibido ${req.params}`})*/
})

app.put( '/api/product/:productId', ( req, res ) => {

})

app.delete( '/api/product/productId', ( req, res ) => {

})

mongoose.connect( 'mongodb://localhost:27017/shop' , ( err, res ) => {
    if( err ) throw err
    console.log( 'conecions a la base de datos establecida...' )

    app.listen( port, ()  =>  {
        console.log(`API REST corriendo en  http://${url}:${port}` ) 
   }) 
})



