# How to Get Your Shopify Storefront API Credentials

You're on the right page! Here's exactly what to do:

## Step 1: Set Up Custom Distribution (Required First)

**IMPORTANT:** Before enabling Storefront API, you need to set up custom distribution:

1. Click on **"Select distribution method"** link in the Storefront API section (or go to **Distribution** in the left sidebar)
2. Choose **"Custom app"** as your distribution method
3. Save the distribution settings

## Step 2: Enable Storefront API

1. You're already on the **API access** page (you can see the "Storefront API" section)
2. In the **"Storefront API"** section, click the **"Enable Storefront API"** button
3. This will allow your app to access product information, create customer orders, and check out purchases programmatically

## Step 3: Configure Storefront API Scopes

After enabling, you'll need to configure the scopes. You may need to:

1. Go to your app's **Settings** or **Configuration** page
2. Look for **"Storefront API access scopes"** section
3. Enable these scopes:
   - `unauthenticated_read_product_listings` (to read products)
   - `unauthenticated_read_collection_listings` (to read collections)
   - `unauthenticated_read_product_inventory` (optional, for inventory)

## Step 4: Install App and Get Access Token

1. Go to your **Shopify Admin** (not Partners dashboard)
2. Navigate to **Settings** → **Apps and sales channels**
3. Click on **"Develop apps"** (if you don't see your app listed)
4. Find your **"abaya"** app and click on it
5. Click **"Install app"** or **"Configure"**
6. After installation, you'll see a **"Storefront API access token"** section
7. Click **"Reveal token"** or **"Copy token"**
8. Copy the token (it will look like: `shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

**Note:** This is DIFFERENT from the Admin API secret. The Storefront API token is specifically for public storefront access.

## Step 5: Find Your Store Link

1. In your **Shopify Admin** (not Partners), look at the top of the page
2. Your store link is in the format: `yourstorename.myshopify.com`
3. You can also find it in **Settings** → **Domains** → it will show your myshopify.com domain
4. Or check the URL when you're in your admin - it will show like: `yourstorename.myshopify.com/admin`

---

## What You Need to Provide:

Once you have both:
- **Store link**: `yourstorename.myshopify.com`
- **Storefront API Access Token**: `shpat_xxxxxxxxxxxxx`

I'll help you set up the connection in your code!

