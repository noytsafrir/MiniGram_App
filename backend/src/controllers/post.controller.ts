import { Request, Response } from "express";
import prisma from "../prisma/client";
import { createPostSchema } from '../validators/postValidator';

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

    const { error } = createPostSchema.validate({ caption });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
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

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profileImg: true,
          },
        },
        photos: true,
        likes: true,
        saves: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const updatedPosts = posts.map((post) => {
      const likesCount = post.likes.length;
      const isLiked = !!post.likes.find((like) => like.userId === userId);
      const isSaved = post.saves.some((save) => save.userId === userId);
      return {
        ...post,
        likes: likesCount,
        isLiked,
        isSaved,
      };
    });

    res.status(200).json(updatedPosts);
  } catch (error) {
    console.error("[Get All Posts]", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

export const toggleLikePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  const { isLiked } = req.body;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  if (isNaN(postId)) return res.status(400).json({ message: "Invalid postId" });

  try {
    if (isLiked) {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    } else {
      await prisma.like.deleteMany({
        where: {
          postId,
          userId,
        },
      });
    }

    res.status(200).json({ message: `Post ${isLiked ? "liked" : "unliked"} successfully.` });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const toggleSavePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  const { isSaved } = req.body;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  if (isNaN(postId)) return res.status(400).json({ message: "Invalid postId" });

  try {
    if (isSaved) {
      await prisma.save.create({
        data: {
          postId,
          userId,
        },
      });
    } else {
      await prisma.save.deleteMany({
        where: {
          postId,
          userId,
        },
      });
    }

    res.status(200).json({ message: `Post ${isSaved ? "saved" : "unsaved"} successfully.` });
  } catch (error) {
    console.error("Error toggling save:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
