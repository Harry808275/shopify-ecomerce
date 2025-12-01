// Shopify Storefront API Examples
// Use these examples to fetch products, collections, and images

const config = require('./shopify.config.js');

// Helper function to make GraphQL requests
async function shopifyRequest(query, variables = {}) {
  try {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(JSON.stringify(data.errors, null, 2));
    }
    
    return data.data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}

// Example 1: Get all products
async function getProducts(first = 20) {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyRequest(query, { first });
  return data.products.edges.map(edge => edge.node);
}

// Example 2: Get all collections
async function getCollections(first = 20) {
  const query = `
    query getCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const data = await shopifyRequest(query, { first });
  return data.collections.edges.map(edge => edge.node);
}

// Example 3: Get products from a specific collection
async function getCollectionProducts(collectionHandle, first = 20) {
  const query = `
    query getCollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id
        title
        products(first: $first) {
          edges {
            node {
              id
              title
              description
              handle
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyRequest(query, { handle: collectionHandle, first });
  return data.collection;
}

// Example 4: Get a single product by handle
async function getProductByHandle(handle) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        handle
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyRequest(query, { handle });
  return data.product;
}

// Example 5: Get shop information
async function getShopInfo() {
  const query = `
    query {
      shop {
        name
        description
        primaryDomain {
          url
        }
      }
    }
  `;

  const data = await shopifyRequest(query);
  return data.shop;
}

// Export all functions
module.exports = {
  getProducts,
  getCollections,
  getCollectionProducts,
  getProductByHandle,
  getShopInfo,
  shopifyRequest,
};

// Example usage (uncomment to test):
/*
(async () => {
  try {
    console.log('Fetching shop info...');
    const shop = await getShopInfo();
    console.log('Shop:', shop);

    console.log('\nFetching products...');
    const products = await getProducts(10);
    console.log(`Found ${products.length} products`);
    products.forEach(product => {
      console.log(`- ${product.title}: ${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`);
    });

    console.log('\nFetching collections...');
    const collections = await getCollections(10);
    console.log(`Found ${collections.length} collections`);
    collections.forEach(collection => {
      console.log(`- ${collection.title}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
})();
*/




