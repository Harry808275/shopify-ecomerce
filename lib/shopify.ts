// Shopify API integration
const config = {
  storeDomain: 'gando2.myshopify.com',
  storefrontAccessToken: '22426fc1601ae9ec4adaa57f48121c38',
  apiVersion: '2024-01',
};

const endpoint = `https://${config.storeDomain}/api/${config.apiVersion}/graphql.json`;

// Validate configuration
if (!config.storeDomain || !config.storefrontAccessToken) {
  throw new Error('Shopify configuration is missing. Please check shopify.config.js');
}

export async function shopifyRequest(query: string, variables: Record<string, any> = {}) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Shopify API request failed: ${response.status} ${response.statusText}. ${errorText}`
      );
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(JSON.stringify(data.errors, null, 2));
    }

    if (!data.data) {
      throw new Error('No data returned from Shopify API');
    }

    return data.data;
  } catch (error: any) {
    console.error('Shopify API Error:', error);
    console.error('Endpoint:', endpoint);
    console.error('Query:', query.substring(0, 100) + '...');
    
    // Provide more helpful error messages
    if (error.message?.includes('fetch failed')) {
      throw new Error(
        `Failed to connect to Shopify API. Please check:\n` +
        `1. Your internet connection\n` +
        `2. The store domain: ${config.storeDomain}\n` +
        `3. The Storefront API access token is valid\n` +
        `4. The endpoint URL: ${endpoint}`
      );
    }
    
    throw error;
  }
}

export async function getProducts(first: number = 20) {
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
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyRequest(query, { first });
  return data.products.edges.map((edge: any) => edge.node);
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        handle
        collections(first: 5) {
          edges {
            node {
              handle
              id
            }
          }
        }
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
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const data = await shopifyRequest(query, { handle });
  return data.product;
}

export async function getRelatedProducts(currentProductId: string, collectionHandle?: string, limit: number = 4) {
  // If we have a collection, get products from that collection
  if (collectionHandle) {
    const collection = await getCollectionProducts(collectionHandle, limit + 5);
    if (collection?.products) {
      const products = collection.products.edges
        .map((edge: any) => edge.node)
        .filter((product: any) => product.id !== currentProductId)
        .slice(0, limit);
      return products;
    }
  }
  
  // Fallback: get random products
  const allProducts = await getProducts(limit + 5);
  return allProducts
    .filter((product: any) => product.id !== currentProductId)
    .slice(0, limit);
}

export async function getCollections(first: number = 20) {
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
  return data.collections.edges.map((edge: any) => edge.node);
}

export async function getCollectionProducts(collectionHandle: string, first: number = 20) {
  const query = `
    query getCollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id
        title
        description
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

export async function searchProductByTitle(searchTerm: string) {
  const query = `
    query searchProducts($query: String!) {
      products(first: 50, query: $query) {
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
              maxVariantPrice {
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
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyRequest(query, { query: `title:*${searchTerm}* OR description:*${searchTerm}*` });
  return data.products.edges.map((edge: any) => edge.node);
}



