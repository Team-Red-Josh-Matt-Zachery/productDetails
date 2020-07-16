// noSQL DB: Cassandra
const cassandra = require('cassandra-driver');

// initialize database
const contactPoints = ['127.0.0.1']// , '127.0.0.2', '127.0.0.3', '127.0.0.4', '127.0.0.5'];
const client = new cassandra.Client({
  contactPoints,
  localDataCenter: 'datacenter1',
  keyspace: 'sidecountry',
});

// connect to the Cassandra DB
client.connect()
  // .then(() => { // drop then create the keyspace (database)
  //   let query = 'DROP KEYSPACE IF EXISTS sidecountry;';
  //   client.execute(query);
  //   console.log('Keyspace dropped');

  //   query = "CREATE KEYSPACE IF NOT EXISTS sidecountry WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'} AND DURABLE_WRITES = false;";
  //   client.execute(query);
  //   console.log('Keyspace created');
  // })
  .then(() => { // remove data from the tables
    const queryArr = [
      'TRUNCATE sidecountry.products;',
      'TRUNCATE sidecountry.photos;',
      'TRUNCATE sidecountry.skus;',
      'TRUNCATE sidecountry.styles;',
    ];
    queryArr.forEach((ele) => {
      client.execute(ele);
    });
    console.log('Data removed from tables');
  })
  .then(() => { // drop the tables if they exist still, somehow
    const queryArr = [
      'DROP TABLE sidecountry.products;',
      'DROP TABLE sidecountry.photos;',
      'DROP TABLE sidecountry.skus;',
      'DROP TABLE sidecountry.styles;',
    ];
    queryArr.forEach((ele) => {
      client.execute(ele);
    });
    console.log('Tables Dropped');
  })
  .then(() => { // create the tables
    const queryArr = [
      'CREATE TABLE sidecountry.products(id INT PRIMARY KEY, category TEXT, default_price DECIMAL, description VARCHAR, name TEXT, rating INT, slogan TEXT,);',
      'CREATE TABLE sidecountry.photos(id INT PRIMARY KEY, url VARCHAR, thumbnail_url VARCHAR,);',
      'CREATE TABLE sidecountry.skus(id INT PRIMARY KEY, L SMALLINT, M SMALLINT, S SMALLINT, XL SMALLINT, XS SMALLINT, XXL SMALLINT, XXXL SMALLINT,);',
      'CREATE TABLE sidecountry.styles(id INT PRIMARY KEY, name TEXT, price DECIMAL, sale_price DECIMAL,);',
    ];

    queryArr.forEach((ele) => {
      client.execute(ele);
    });
    console.log('Tables Created');
  })
  .then(() => { // when copying data from CSV seed file
    const queryArr = [
      "COPY sidecountry.products FROM 'productsDBSeed.csv' WITH DELIMITER=',' AND HEADER=TRUE;",
      "COPY sidecountry.photos FROM 'photosDBSeed.csv' WITH DELIMITER=',' AND HEADER=TRUE;",
      "COPY sidecountry.skus FROM 'skusDBSeed.csv' WITH DELIMITER=',' AND HEADER=TRUE;",
      "COPY sidecountry.styles FROM 'stylesDBSeed.csv' WITH DELIMITER=',' AND HEADER=TRUE;",
    ];

    queryArr.forEach((ele) => {
      client.execute(ele);
    });
    console.log('CSV Copied into Tables');
    return client.shutdown();
  })
  .catch((err) => {
    console.error('Cassandra error', err);
    return client.shutdown().then(() => { throw err; });
  });

// SQL DB: postgres


ALTER KEYSPACE sidecountry WITH REPLICATION = {'class': 'NetworkTopologyStrategy', 'ExistingDC':3, 'NewDC':3} AND DURABLE_WRITES = false;