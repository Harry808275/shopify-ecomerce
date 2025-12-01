// Full test - fetch products, collections, and images
const { getProducts, getCollections, getShopInfo } = require('./shopify-api-examples.js');

async function runFullTest() {
  try {
    console.log('🔍 Testing Shopify Storefront API Connection...\n');

    // Test 1: Get shop info
    console.log('1️⃣ Fetching shop information...');
    const shop = await getShopInfo();
    console.log(`   ✅ Shop Name: ${shop.name}`);
    console.log(`   ✅ Shop URL: ${shop.primaryDomain?.url || 'N/A'}`);
    console.log('');

    // Test 2: Get products
    console.log('2️⃣ Fetching products...');
    const products = await getProducts(5);
    console.log(`   ✅ Found ${products.length} products`);
    if (products.length > 0) {
      products.forEach((product, index) => {
        const price = product.priceRange?.minVariantPrice;
        const imageCount = product.images?.edges?.length || 0;
        console.log(`   ${index + 1}. ${product.title}`);
        console.log(`      Price: ${price ? `${price.amount} ${price.currencyCode}` : 'N/A'}`);
        console.log(`      Images: ${imageCount}`);
        console.log(`      Handle: ${product.handle}`);
      });
    }
    console.log('');

    // Test 3: Get collections
    console.log('3️⃣ Fetching collections...');
    const collections = await getCollections(5);
    console.log(`   ✅ Found ${collections.length} collections`);
    if (collections.length > 0) {
      collections.forEach((collection, index) => {
        console.log(`   ${index + 1}. ${collection.title}`);
        console.log(`      Handle: ${collection.handle}`);
        if (collection.image) {
          console.log(`      Has image: Yes`);
        }
      });
    }
    console.log('');

    console.log('🎉 All tests passed! Your Shopify connection is working perfectly!');
    console.log('\n📦 You can now use these functions in your custom website:');
    console.log('   - getProducts() - Fetch products with images');
    console.log('   - getCollections() - Fetch collections');
    console.log('   - getProductByHandle() - Get a specific product');
    console.log('   - getCollectionProducts() - Get products from a collection');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.error('\n⚠️  Authentication error. Please check your Storefront API access token.');
    } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
      console.error('\n⚠️  Permission error. Please check your API scopes in Shopify Partners.');
    }
  }
}

runFullTest();




