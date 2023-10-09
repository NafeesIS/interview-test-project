//url : http://localhost:3000/api/posts/id

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    const info = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!info) {
      return NextResponse.json({ message: "Post Not Found", err }, { status: 404 });
    }
    return NextResponse.json(info);
  } catch (err) {
    console.error("Prisma Validation Error:", err);
    return NextResponse.json({ message: "Get Error", err }, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content, category } = body;
    const updateInfo = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        category,
      },
    });
    return NextResponse.json(updateInfo);
  } catch (err) {
    console.error("Prisma Validation Error:", err);
    return NextResponse.json({ message: "Update Error", err }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const { id } = params;
    const deletePost = await prisma.post.delete({
      where: {
        id,
      },
    });
    return NextResponse.json("Post deleted!!!", deletePost);
  } catch (err) {
    console.error("Prisma Validation Error:", err);
    return NextResponse.json({ message: "Delete Error", err }, { status: 500 });
  }
};
