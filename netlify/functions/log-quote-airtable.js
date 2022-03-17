/* eslint-disable */
import fetch from 'node-fetch';
import Airtable from 'airtable';

const airtable_api_key = process.env.AIRTABLE_API_KEY;

exports.handler = async function(event, context) {
  
  if (!airtable_api_key) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Missing Airtable API environment variables" })
    }
  }
  
  const quote_body = event.body;
  
  console.log(JSON.parse(quote_body).quoteId);
  
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(quote_body),
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Headers": "Content-Type",
  //     "Access-Control-Allow-Methods": "GET, POST, OPTION",
  //   },
  // };

  var base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('appCBbGAaPXDIwMEK');
  
  base('Quotes').create([
    {
      "fields": {
        Quote: JSON.parse(quote_body).quoteId,
        Data: quote_body
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTION",
        }
      }
    }
    records.forEach(function (record) {
      console.log(record.getId());
      return {
        statusCode: 200,
        body: JSON.stringify(record.getId()),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTION",
        },
      };
    });
  });
  
}
