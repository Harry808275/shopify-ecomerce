import { NextRequest, NextResponse } from 'next/server'
import { shopifyRequest } from '@/lib/shopify'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, email, shippingAddress } = body

    // Create checkout using Shopify Storefront API
    const mutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
            totalPrice {
              amount
              currencyCode
            }
          }
          checkoutUserErrors {
            field
            message
          }
        }
      }
    `

    const lineItems = items.map((item: { variantId: string; quantity: number }) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }))

    const variables = {
      input: {
        lineItems,
        email,
        shippingAddress: {
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          address1: shippingAddress.address,
          city: shippingAddress.city,
          zip: shippingAddress.zipCode,
          country: shippingAddress.country,
          phone: shippingAddress.phone,
        },
      },
    }

    const data = await shopifyRequest(mutation, variables)

    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      return NextResponse.json(
        { error: data.checkoutCreate.checkoutUserErrors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      checkoutUrl: data.checkoutCreate.checkout.webUrl,
      checkoutId: data.checkoutCreate.checkout.id,
    })
  } catch (error: any) {
    console.error('Checkout API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout' },
      { status: 500 }
    )
  }
}




