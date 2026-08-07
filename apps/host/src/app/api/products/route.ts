import { NextResponse } from "next/server";
import { createProduct, listProducts } from "@/lib/mock-db";

export async function GET() {
  return NextResponse.json(listProducts());
}

export async function POST(request: Request) {
  const body = await request.json();
  const product = createProduct(body);
  return NextResponse.json(product, { status: 201 });
}
