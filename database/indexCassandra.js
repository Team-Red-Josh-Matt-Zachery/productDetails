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
    const query = 'TRUNCATE sidecountry.products;';
    client.execute(query);
    console.log('Data removed from table');
  })
  .then(() => { // drop the tables if they exist still, somehow
    const query = 'DROP TABLE sidecountry.products;';
    client.execute(query);
    console.log('Table Dropped');
  })
  .then(() => { // create the tables
    const query = 'CREATE TABLE sidecountry.products(id INT PRIMARY KEY, category TEXT, default_price DECIMAL, description VARCHAR, name TEXT, rating INT, slogan TEXT,);';
    client.execute(query);
    console.log('Tables Created');
  })
  .then(() => { // when copying data from CSV seed file
    const query = "COPY sidecountry.products FROM 'productsDBSeed.csv' WITH DELIMITER=',' AND HEADER=TRUE;";
    client.execute(query);
    console.log('CSV Copied into Tables');
    return client.shutdown();
  })
  .catch((err) => {
    console.error('Cassandra error', err);
    return client.shutdown().then(() => { throw err; });
  });

// SQL DB: postgres

// ALTER KEYSPACE sidecountry WITH REPLICATION = {'class': 'NetworkTopologyStrategy', 'ExistingDC':3, 'NewDC':3} AND DURABLE_WRITES = false;

// on EC2 instance:
// CREATE KEYSPACE IF NOT EXISTS sidecountry WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'} AND DURABLE_WRITES = false;
// CREATE TABLE sidecountry.products(id INT PRIMARY KEY, category TEXT, default_price DECIMAL, description VARCHAR, name TEXT, rating INT, slogan TEXT, style TEXT);
// COPY sidecountry.products FROM 'productsDBSeed.csv' WITH DELIMITER=',' AND HEADER=TRUE;
