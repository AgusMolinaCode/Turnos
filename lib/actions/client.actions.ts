"use server";

import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  CLIENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error("An error occurred while fetching user:", error);
  }
};

export const registerUser = async ({
  documentoUrlPhoto,
  ...clientData
}: RegisterUserParams) => {
  try {
    let file;
    if (documentoUrlPhoto) {
      const inputFile = InputFile.fromBuffer(
        documentoUrlPhoto?.get("blobFile") as Blob,
        documentoUrlPhoto?.get("fileName") as string
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    console.log(
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
        ...clientData,
      }
    );

    const newClient = await databases.createDocument(
      DATABASE_ID!,
      CLIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        documentoUrlPhoto: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...clientData,
      }
    );

    return parseStringify(newClient);
  } catch (error) {
    console.error("An error occurred while registering user:", error);
  }
};
