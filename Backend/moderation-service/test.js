require('dotenv').config();
const { google } = require('googleapis');

if (!process.env.PERSPECTIVE_API_KEY) {
  throw new Error("PERSPECTIVE_API_KEY missing");
}

const API_KEY = process.env.PERSPECTIVE_API_KEY;

const DISCOVERY_URL =
  'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

async function testPerspective() {
  try {
    const client = await google.discoverAPI(DISCOVERY_URL);

    const response = await client.comments.analyze({
      key: API_KEY,
      resource: {
        comment: { text: "You are stupid and disgusting" },
        requestedAttributes: { TOXICITY: {} }
      }
    });

    console.log(JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

testPerspective();
