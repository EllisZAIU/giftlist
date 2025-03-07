import express from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import { Gift } from "./models/giftModel.js";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Middleware to parse JSON bodies

// add a default route
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the gift list');
});

/*
app.get('/gift', (request, response) => {

    console.log(`Receiver request: ${request.method} ${request.url}`);
    return response.status(234).send('Gift / ');
});
*/

app.post('/gift', async (req, res) => {
    try {
        if (
            !req.body.person ||
            !req.body.giftitem ||
            !req.body.price 
        ) {
            return res.status(400).send({
                message: 'Send all required fields: person, giftitem, price, purchased',
            });
        }

        // Ensure 'purchased' is set to false if it's missing
        const newGift = { 
            person: req.body.person,
            giftitem: req.body.giftitem,
            price: req.body.price,
            purchased: req.body.hasOwnProperty('purchased') ? req.body.purchased : false,
        };

        const gift = await Gift.create(newGift);
        return res.status(201).send(gift);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// route to get all gifts
app.get('/gift', async( req,res ) => {
    try {
        const gift = await Gift.find( {} );
        //return res.status(200).json(gift);
        return res.status(200).json({
            count: gift.length,
            data:gift,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send( { message: err.message });
    }
});

// Route to get a single gift by ID
app.get('/gift/:id', async( req, res ) => {
    console.log('look up by id');
    try {
        const { id } = req.params;
        console.log('Looking up by ID = ', id);
        const gift = await Gift.findById(id);

        return res.status(200).json(gift);
    } catch(err) {
        console.log(err.message);
        res.status(500).send( {message: err.message} );
    }
});

app.put('/gift/:id', async (req, res) => {
    try {
        if (
            !req.body.person ||
            !req.body.giftitem ||
            !req.body.price
        ) {
            return res.status(400).send( {
                message: 'send all required fields',
            });
        }

        console.log( req.params ); // let's see what this looks like
        const { id } = req.params;
        const result = await Gift.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json( {message: 'gift not found'} );
        }

        return res.status(200).send( { message: 'gift updated successfully'} );

    } catch (err) {
        console.log(err.message);
        res.status(500).send( {message: err.message});
    }
})

app.delete('/gift/:id', async( req, res) => {
    try {
        const { id } = req.params;
        const result = await Gift.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json( {message: 'gift not found' });
        }

        return res.status(200).send( { message: 'gift deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send( {message: err.message} );
    }
} );

app.get('/gift/person/:name', async (req, res) => {
    try {
        const { name } = req.params;  // Extract name from URL parameter

        const gifts = await Gift.find({ person: name });  // Find all matching records

        if (gifts.length === 0) {
            return res.status(404).json({ message: 'No gifts found for this person' });
        }

        return res.status(200).json({
            count: gifts.length, // Number of matching records
            data: gifts          // The actual records
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});



/*
app.listen (PORT, () => {
    console.log(`App is listening to port: ${ PORT }`);
});
*/

mongoose
    .connect(mongoDBURL)
    .then(() => {  // ✅ Corrected
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening to PORT: ${ PORT }`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
