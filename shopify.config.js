// Shopify Storefront API Configuration
// Fill in these values after getting them from your Shopify admin

module.exports = {
  // Your store link (e.g., "yourstore.myshopify.com")
  storeDomain: 'gando2.myshopify.com',
  
  // Your Storefront API Access Token
  // This is DIFFERENT from the Admin API secret
  // It should start with "shpat_" or similar
  storefrontAccessToken: '22426fc1601ae9ec4adaa57f48121c38',
  
  // API version (you can use the latest stable version)
  apiVersion: '2024-01',
  
  // Storefront API endpoint
  get endpoint() {
    return `https://${this.storeDomain}/api/${this.apiVersion}/graphql.json`;
  }
};

