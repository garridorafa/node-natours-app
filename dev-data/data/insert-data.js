require('dotenv').config({ path: './config.env' });
const fs = require('fs');
const mongoose = require('mongoose');
const Tours = require('../../models/tourModel');

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tours.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tours.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
  process.exit();
} else if (process.argv[2] === '--delete') {
  deleteData();
  process.exit();
}
