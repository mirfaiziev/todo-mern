const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
const PORT = config.get('port') || process.exit(1);

app.use('/api/auth', require('./routes/auth.route'))

async function start() {
    try {
        await mongoose.connect(
            config.get('mongoUri'), {
                useNewUrlParser: true,
                useUnifiedTopology:true,
                useCreateIndex: true
            });
        app.listen(PORT, () => console.log(`server is working on ${PORT}`))
    } catch (e) {
        console.log(e)
        console.error('Server Error: ', e.message);
        process.exit(1);
    }
}

start();
