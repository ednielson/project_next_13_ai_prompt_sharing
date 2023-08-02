const mongoose = require('mongoose');
const dotenv = require('dotenv');
const QRStyle = require('./models/QRStyle.js');  // Adjust the path

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas using the MONGODB_URI from the environment
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1);
    });

// Define your styles
const styles = [
    { name: 'Classic', imagePath: '/classic.png', prompt: 'specific_prompt_for_classic' },
    { name: 'Modern', imagePath: '/modern.png', prompt: 'specific_prompt_for_modern' },
    { name: 'Artistic', imagePath: '/artistic.png', prompt: 'specific_prompt_for_artistic' }
];

// Save the styles to the database
styles.forEach(styleData => {
    const style = new QRStyle(styleData);
    style.save()
        .then(() => {
            console.log(`Saved style: ${styleData.name}`);
        })
        .catch(error => {
            console.error(`Error saving style ${styleData.name}:`, error);
        });
});

// Close the connection after a delay (to allow all saves to complete)
setTimeout(() => {
    mongoose.connection.close();
    console.log('Connection closed');
}, 5000);
