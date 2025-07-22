import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { caption } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const imagePaths = (req.files as Express.Multer.File[]).map((file) => {
      return `/uploads/${file.filename}`;
    });

    const post = await prisma.post.create({
      data: {
        caption,
        userId,
        photos: {
          createMany: {
            data: imagePaths.map((path, index) => ({
              imageUrl: path,
              position: index + 1,
            })),
          },
        },
      },
      include: {
        photos: true,
      },
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("[Create Post Error]", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
