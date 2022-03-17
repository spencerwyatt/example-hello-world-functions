/* eslint-disable */
import fetch from 'node-fetch';
import Airtable from 'airtable';

const airtable_api_key = process.env.AIRTABLE_API_KEY;

exports.handler = async function(event, context) {
  
  if (!airtable_api_key) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Missing Airtable API environment variables" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTION",
      },
    }
  }
  
  const quote_body = event.body;
  const quoteId = JSON.parse(quote_body).quoteId

  var base = new Airtable({apiKey: 'keyBusLTnPAtXou08'}).base('appCBbGAaPXDIwMEK');

  const record = await base('Quotes').create([
    {
      "fields": {
        "Quote": quoteId,
        "Data": quote_body
      }
    }
  ])
  
  if (record) {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Airtable record created" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTION",
      },
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Missing Airtable API environment variables" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTION",
      },
    }
  }

}
