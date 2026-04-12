import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    
    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { items, totalAmount } = await req.json();

    if (!items || items.length === 0) {
      return new NextResponse("Cart is empty", { status: 400 });
    }

    // 1. Create the pending order in our database
    // For simplicity, we assume all items belong to the same vendor for this checkout session
    const vendorId = items[0].vendorId;

    const order = await prisma.order.create({
      data: {
        orderNumber: `PS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        customerId: userId,
        customerEmail: user.emailAddresses[0].emailAddress,
        customerName: `${user.firstName} ${user.lastName}`,
        vendorId,
        totalAmount,
        status: "PENDING",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // 2. Initialize Paystack Transaction
    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.emailAddresses[0].emailAddress,
        amount: Math.round(totalAmount * 100), // Paystack expects amount in kobo/cents
        reference: order.id, // We use our order ID as the reference
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/success`,
        metadata: {
          orderId: order.id,
          vendorId,
        },
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      console.error("Paystack Init Error:", paystackData);
      return new NextResponse("Payment initialization failed", { status: 500 });
    }

    return NextResponse.json({ url: paystackData.data.authorization_url });
  } catch (error) {
    console.error("[PAYSTACK_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
