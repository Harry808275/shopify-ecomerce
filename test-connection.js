// Test script to verify your Shopify Storefront API connection
// Run this after filling in your credentials in shopify.config.js

const config = require('./shopify.config.js');

async function testConnection() {
  const query = `
    query {
      shop {
        name
        description
      }
    }
  `;

  try {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('❌ Connection failed:');
      console.error(data.errors);
    } else {
      console.log('✅ Connection successful!');
      console.log('Shop name:', data.data.shop.name);
      console.log('Shop description:', data.data.shop.description);
    }
  } catch (error) {
    console.error('❌ Error connecting to Shopify:');
    console.error(error.message);
  }
}

testConnection();




