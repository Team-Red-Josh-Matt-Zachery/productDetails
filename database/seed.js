// seed to an outside file, so that it is just generated once.
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const { Faker } = require('fakergem');

const SEED_AMOUNT = 1e1;
const writeProducts = csvWriter();
let i = 0;

// how long did the CSV take to create?
const timeBefore = new Date().getTime(); // time before

// setup of CSV seed
const seedDataGeneration = () => {
  writeProducts.pipe(fs.createWriteStream('productsDBSeed.csv'), { delimiter: ',' });
  function writing() {
    let heapy = true;
    while (i < SEED_AMOUNT && heapy) {
      i += 1;
      heapy = writeProducts.write({
        id: i,
        category: Faker.Commerce.department(1),
        default_price: Faker.Commerce.price({ min: 5, max: 380 }),
        description: Faker.Hipster.paragraph(),
        name: Faker.Commerce.productName(),
        rating: Faker.Number.between(1, 10),
        slogan: faker.company.catchPhrase(),
        style: `{'name': '${Faker.Hipster.word()}','price': '${Faker.Commerce.price({ min: 5, max: 380 })}','sale_price': '${Faker.Commerce.price({ min: 0, max: 190 })}','photos': {'url': 'http://placeimg.com/100/100/any', 'thumbnail_url': 'http://placeimg.com/1000/1000/any}','skus': {'L': '${Faker.Number.between(0, 28)}', 'M': '${Faker.Number.between(0, 28)}', 'S': '${Faker.Number.between(0, 28)}', 'XL': '${Faker.Number.between(0, 28)}', 'XS': '${Faker.Number.between(0, 28)}', 'XXL': '${Faker.Number.between(0, 28)}', 'XXXL': '${Faker.Number.between(0, 28)}'}`,
      });
    }
    writeProducts.once('drain', writing);
    process.stdout.write(` ${((i / SEED_AMOUNT) * 100).toFixed(2)}% complete.  Time Elapsed: ${((new Date().getTime() - timeBefore) / 60000).toFixed(2)} minutes.  Estimated time left: ${Math.round(((new Date().getTime() - timeBefore) / (60000 * i)) * (SEED_AMOUNT - i))} minutes \r`);
    if (i === SEED_AMOUNT) {
      writeProducts.end();
      // stop writing already
      const timeAfter = new Date().getTime(); // time after
      const timeTaken = timeAfter - timeBefore; // run-time difference
      process.stdout.write(`\nTIME to write CSV data: ${timeTaken / 1000} seconds.`);
    }
  }
  writing();
};

seedDataGeneration();

// `{name: ${Faker.Hipster.word()},price: ${Faker.Commerce.price({ min: 5, max: 380 })},sale_price: ${Faker.Commerce.price({ min: 0, max: 190 })},photos: {url: http://placeimg.com/100/100/any, thumbnail_url: http://placeimg.com/1000/1000/any},skus: {L: ${Faker.Number.between(0, 28)}, M: ${Faker.Number.between(0, 28)}, S: ${Faker.Number.between(0, 28)}, XL: ${Faker.Number.between(0, 28)}, XS: ${Faker.Number.between(0, 28)}, XXL: ${Faker.Number.between(0, 28)}, XXXL: ${Faker.Number.between(0, 28)}}`,
