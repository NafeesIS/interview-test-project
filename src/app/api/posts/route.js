//url : http://localhost:3000/api/posts

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { title, content, content_details, image, category } = body;
    const newInfo = await prisma.post.create({
      data: {
        title,
        content,
        content_details,
        image,
        category,
      },
    });
    return NextResponse.json(newInfo);
  } catch (err) {
    console.error("Prisma Validation Error:", err);
    return NextResponse.json({ message: "Info Errorr", err }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const infos = await prisma.post.findMany();
    return NextResponse.json(infos);
  } catch (err) {
    console.error("Prisma Validation Error:", err);
    return NextResponse.json({ message: "Get Error", err }, { status: 500 });
  }
};
