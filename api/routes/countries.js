const express = require('express');
const sql = require('mssql')
const router = express.Router();
const dbOps = require('./../../dboperatons');
const app = require('./../../app');
const config = require('./../../dbconfig');
const lowercaseKeys = require('lowercase-keys');


const Country = require('./../../models/country');
const {
   getCountriess
} = require('./../../dboperatons');



router.get('/', function (req, res) {
   sql.connect(config, function (err) {
      if (err) console.log(err);

      // crete request object
      // const request = new sql.Request();
      console.log('inside router GET');
      dbOps.getCountriess().then(result => {
         console.log(result);
         console.log('hi ya');
         keysToLowerCase(result.recordset);
         //this is the data that makes it to the client
         res.status(200).json(result.recordset);
         //return result;
      })

      function keysToLowerCase(obj) {
         var key, keys = Object.keys(obj);
         var n = keys.length;
         var newobj = {}
         while (n--) {
            key = keys[n];
            newobj[key.toLowerCase()] = obj[key];
         }
         return newobj;
      }

      /*       keysToLowerCase (obj) {
               var keys = Object.keys(obj);
               var n = keys.length;
               while (n--) {
                 var key = keys[n]; // "cache" it, for less lookups to the array
                 if (key !== key.toLowerCase()) { // might already be in its lower case version
                     obj[key.toLowerCase()] = obj[key] // swap the value to a new lower case key
                     delete obj[key] // delete the old key
                 }
               }
               return (obj);
             } */
      //            request.query('select * FROM countries', function (err, recordset) {
      //               if (err) console.log(err);
      //               console.log(recordset);
      // res.send(recordset);
      // res.status(200).json(recordset);
   })
})


/* const countries = new Country();

this.countries = dbOps.getCountries().then(result => {
   console.log(result);
}) */

/* const countries =  dbOps.getCountries().then(result => {
   console.log(result);
})
console.log(countries); */

/* countries = async function getCountries() {
   try {
      let pool = await sql.connect(config);
      let countries = await pool.request().query("SELECT * FROM Countries");
      return countries.recordsets;
   }
   catch (error) {
      console.log(error);
   }
} */

/* 
const countries = [
   {
      "id": 1,
      "name": "China"
   },
   {
      "id": 2,
      "name": "USA"
   }
];

router.get('/', (req, res, next) => {
   res.status(200).json(countries)
}); */



/* router.get("/", (req, res, next) => {
   
   res.status(200).json({
      message: 'Handling GET requests to /countries',
   });
   //this.countries = res.body.countries;
   // console.log(res.body.countries);
}); */

/*    dboperations.getCountries().then(res => {
      console.log(res);
      return countries.recordsets;
   })
}) */
/*    let pool = await sql.connect(config);
   let countries = await pool.request().query("SELECT * FROM Countries");
   return countries.recordsets;
}); */
/*    Country.find() // could use a callback here to fore once all docs are fetched and returns an object with a then block
     .then(countries => {
       console.log(countries);
 
       res.status(200).json({ // we must put the response code into the then block because fetching that data is asynchrounous so we must wait for the documents
         message: "Posts fetched successfully!",
         countries: countries  // then we changed posts: posts because we no longer use posts, we are using documents from mongodb
       });
     });
 }); */

router.post('/', (req, res, next) => {
   const country = {
      id: req.body.id,
      name: req.body.name
   };
   res.status(201).json({
      message: 'Handling POST requests to /countries',
      createdCountry: country
   })
});


router.get('/:countryId', (req, res, next) => {
   const id = req.params.countryId;
   res.status(200).json({
      message: 'You passed ' + id + ' as the id'
   });
});

router.patch('/:countryId', (req, res, next) => {
   const id = req.params.countryId;
   res.status(201).json({
      message: 'Country with id ' + id + ' has been updated'
   });
});

router.delete('/:countryId', (req, res, next) => {
   const id = req.params.countryId;
   res.status(200).json({
      message: 'Country with ' + id + ' has been deleted'
   });
});

module.exports = router;