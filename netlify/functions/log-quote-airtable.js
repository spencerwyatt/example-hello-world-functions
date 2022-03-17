/* eslint-disable */
const fetch = require('node-fetch');
const Airtable = require('airtable');

const airtable_api_key = process.env.AIRTABLE_API_KEY;

exports.handler = async function(event, context) {
  
  if (!airtable_api_key) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Missing Airtable API environment variables" })
    }
  }
  
  var quote_body = event.body;
  
  console.log(quote_body);
  
  return null;

  // var base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('appCBbGAaPXDIwMEK');
  // 
  // base('Quotes').create([
  //   {
  //     "fields": {}
  //   }
  // ], function(err, records) {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   records.forEach(function (record) {
  //     console.log(record.getId());
  //   });
  // });
  
}
