import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const paystackSignature = req.headers.get("x-paystack-signature");

    if (!paystackSignature) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    // 1. Verify Signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(rawBody)
      .digest("hex");

    if (hash !== paystackSignature) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    // 2. Parse Event
    const event = JSON.parse(rawBody);

    if (event.event === "charge.success") {
      const { reference, status } = event.data;
      const orderId = reference; // In our init, we set order.id as reference

      if (status === "success") {
        // Update Order to PAID
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: "PAID",
            paymentReference: event.data.reference,
          },
        });
        
        console.log(`Order ${orderId} successfully paid.`);
      }
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (error) {
    console.error("[PAYSTACK_WEBHOOK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
