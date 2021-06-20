require('dotenv').config({ path: './config.env' });

const mongoose = require('mongoose');

const app = require('./app');

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a name'],
  },
  rating: {
    type: Number,,
    default: 4.5
  },
  price: {
    type: Number,
    require: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model("Tour", tourSchema)


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
