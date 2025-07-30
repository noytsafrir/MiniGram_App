import { Request, Response } from "express";
import prisma from "../prisma/client";


export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        profileImg: true,
        bio: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("[Get User Profile Error]", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { username, bio } = req.body;
    const profileImg = req.file?.filename;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const dataToUpdate: any = {};
    if (username) dataToUpdate.username = username;
    if (bio) dataToUpdate.bio = bio;
    if (profileImg) dataToUpdate.profileImg = `/uploads/${profileImg}`;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
      select:{
        id: true,
        username: true,
        profileImg: true,
        bio: true,
      }
    });

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("[Update User Profile Error]", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getUserProfileById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = Number(userId);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        profileImg: true,
        bio: true,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("[Get User Profile By ID Error]", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}