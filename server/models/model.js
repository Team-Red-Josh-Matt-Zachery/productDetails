const cassandra = require('cassandra-driver');
const { Client } = require('pg');

// CASSANDRA Addresses for clusters (currently 1)
// const contactPoints = ['127.0.0.1'] //, '127.0.0.2', '127.0.0.3', '127.0.0.4', '127.0.0.5'];
// const client = new cassandra.Client({ contactPoints, localDataCenter: 'datacenter1', keyspace: 'sidecountry' });

// Postgres connection
const clientP = new Client('sidecountry');
clientP.connect();
/* *******************************************************************
************************* CASSANDRA DBMS *****************************
******************************************************************* */
// !EXAMPLE ONLY ! DB QUERY TO ADD/INSERT RECORD
const addProduct = (params, cb) => {
  const query = `INSERT INTO sidecountry.products ${params} VALUES (id, name, etc.)`;
  client.execute(query, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results.rows);
    }
  });
};

/*
// DB QUERY TO GET ALL PRODUCTS
const getProducts = (cb) => {
  const query = 'SELECT * FROM sidecountry.products';
  client.execute(query, (err, results) => {
    if (err) {
      cb(err);
    } else {
      // console.log(results.rows);
      cb(null, results.rows);
    }
  });
};

// DB QUERY TO GET PRODUCT
const getProduct = (params, cb) => {
  const query = 'SELECT * FROM sidecountry.products WHERE id = ?';
  client.execute(query, [params], { prepare: true }, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results.rows);
    }
  });
}; */

// DB QUERY TO GET STYLE
const getProductStyle = (params, cb) => {
  const query = 'SELECT * FROM sidecountry.styles WHERE id = ?';
  client.execute(query, [(params % 1000) + 1], { prepare: true }, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results.rows);
    }
  });
};

// DB QUERY TO GET PHOTOS
const getProductPhotos = (params, cb) => {
  const query = 'SELECT * FROM sidecountry.photos WHERE id = ?';
  client.execute(query, [(params % 1000) + 1], { prepare: true }, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, [results.rows]);
    }
  });
};

// DB QUERY TO GET SKUS
const getProductSkus = (params, cb) => {
  const query = 'SELECT * FROM sidecountry.skus WHERE id = ?';
  client.execute(query, [(params % 1000) + 1], { prepare: true }, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results.rows);
    }
  });
};

// !EXAMPLE ONLY ! DB QUERY TO UPDATE RECORD
const editProduct = (params, cb) => {
  const query = `UPDATE sidecountry.products SET id = ${params + 5} WHERE id=${params}`;
  client.execute(query, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results.rows);
    }
  });
};

// !EXAMPLE ONLY ! DB QUERY TO DELETE RECORD
const removeProduct = (params, cb) => {
  const query = `DELETE * FROM sidecountry.products WHERE id=${params}`;
  client.execute(query, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results.rows);
    }
  });
};

/* *******************************************************************
************************ POSTGRESQL DBMS *****************************
******************************************************************* */
// DB QUERY TO GET ALL PRODUCTS
const getProducts = (cb) => {
  const query = 'SELECT * FROM sidecountry.products';
  clientP.query(query, (err, results) => {
    if (err) {
      cb(err);
    } else {
      // console.log(results.rows);
      cb(null, results.rows);
    }
  });
};

// DB QUERY TO GET PRODUCT
const getProduct = (params, cb) => {
  const query = `SELECT * FROM products WHERE id = ${params}`;
  clientP.query(query, (err, results) => {
    if (err) {
      cb(err.stack);
    } else {
      cb(null, results.rows[0]);
    }
  });
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  getProductStyle,
  getProductPhotos,
  editProduct,
  removeProduct,
};
