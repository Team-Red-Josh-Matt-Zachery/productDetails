// seed to an outside file, so that it is just generated once.
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const { Faker } = require('fakergem');

const SEED_AMOUNT = 1e7;
const writeProducts = csvWriter();
const writePhotos = csvWriter();
const writeStyles = csvWriter();
const writeSkus = csvWriter();
let i = 1;

// how long did the CSV take to create?
const timeBefore = new Date().getTime(); // time before

// setup of CSV seed
const seedDataGeneration = () => {
  writeProducts.pipe(fs.createWriteStream('productsDBSeed.csv'));
  writePhotos.pipe(fs.createWriteStream('photosDBSeed.csv'));
  writeStyles.pipe(fs.createWriteStream('stylesDBSeed.csv'));
  writeSkus.pipe(fs.createWriteStream('skusDBSeed.csv'));
  function writing() {
    let heapy = true;
    while (i <= SEED_AMOUNT && heapy) {
      heapy = writeProducts.write({
        id: i,
        category: Faker.Commerce.department(1),
        default_price: Faker.Commerce.price({ min: 5, max: 380 }),
        description: Faker.Hipster.paragraph(),
        name: Faker.Commerce.productName(),
        rating: Faker.Number.between(1, 100),
        slogan: faker.company.catchPhrase(),
      });
      if (i <= SEED_AMOUNT / 10) {
        heapy = writeStyles.write({
          id: i % (SEED_AMOUNT / 100),
          name: Faker.Hipster.word(),
          original_price: Faker.Commerce.price({ min: 5, max: 380 }),
          sale_price: Faker.Commerce.price({ min: 0, max: 190 }),
        });
        heapy = writePhotos.write({
          id: i % (SEED_AMOUNT / 100),
          thumbnail_url: Faker.LoremPixel.image(),
          url: Faker.LoremPixel.image(),
        });
        heapy = writeSkus.write({
          id: i % (SEED_AMOUNT / 100),
          L: Faker.Number.between(0, 28),
          M: Faker.Number.between(0, 28),
          S: Faker.Number.between(0, 28),
          XL: Faker.Number.between(0, 28),
          XS: Faker.Number.between(0, 28),
          XXL: Faker.Number.between(0, 28),
          XXXL: Faker.Number.between(0, 28),
        });
        i += 1;
      }
    }
    writeProducts.once('drain', writing);
    process.stdout.write(` ${((i / SEED_AMOUNT) * 100).toFixed(2)}% complete.  Time Elapsed: ${((new Date().getTime() - timeBefore) / 60000).toFixed(2)} minutes.  Estimated time left: ${Math.round(((new Date().getTime() - timeBefore) / (60000 * i)) * (SEED_AMOUNT - i))} minutes \r`);
    if (i === SEED_AMOUNT) {
      writeProducts.end();
      writeSkus.end();
      writePhotos.end();
      writeStyles.end();
      // stop writing already
      const timeAfter = new Date().getTime(); // time afeter
      const timeTaken = timeAfter - timeBefore; // run-time difference
      process.stdout.write(`\nTIME to write CSV data: ${timeTaken / 1000} seconds.`);
    }
  }
  writing();
};

seedDataGeneration();
