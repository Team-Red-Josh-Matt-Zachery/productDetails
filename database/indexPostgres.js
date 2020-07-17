const { Client } = require('pg');

const client = new Client();

// in terminal, connect to postgres: psql postgres
// list the databases: \list
// switch to database: \connect sidecountry
// drop table: DROP TABLE products;
// clear table: TRUNCATE products;

client.query('CREATE DATABASE sidecountry')
  .then(() => console.log('Database created'))
  .catch((err) => console.log(err.stack));

const query = 'CREATE TABLE products (id SERIAL PRIMARY KEY, category VARCHAR(50), default_price MONEY, description TEXT, name TEXT, rating SMALLINT, slogan TEXT, style TEXT);';
client.query(query)
  .then(() => console.log('Table created'))
  .catch((err) => console.log(err.stack));

// COPY FROM CSV FILE
/*
COPY products FROM '/Users/Josh/Desktop/HR_Immersive/SDC/productDetails/productsDBSeed.csv'
DELIMITER ',' CSV HEADER;
*/

// CREATE INDEXES FOR ID
// CREATE INDEX sidecountry_hash ON products USING HASH (id);
// CREATE INDEX sidecountry_brin ON products USING BRIN (id) WITH (pages_per_range = 256);

// remove indexes
// DROP INDEX sidecountry_hash;
// DROP INDEX sidecountry_brin;
