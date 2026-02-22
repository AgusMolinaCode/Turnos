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

// Clase de error personalizada para Appwrite
class AppwriteError extends Error {
  code?: number;
  
  constructor(message: string, code?: number) {
    super(message);
    this.name = 'AppwriteError';
    this.code = code;
  }
}

// Helper para manejar errores de Appwrite
function handleAppwriteError(error: unknown, context: string): never {
  console.error(`Error in ${context}:`, error);
  
  if (error instanceof AppwriteError) {
    throw error;
  }
  
  if (typeof error === 'object' && error !== null && 'code' in error) {
    throw new AppwriteError(
      `${context} failed`,
      (error as { code: number }).code
    );
  }
  
  throw new AppwriteError(`${context} failed: ${String(error)}`);
}

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
    if (error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    handleAppwriteError(error, "createUser");
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    handleAppwriteError(error, "getUser");
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
    handleAppwriteError(error, "registerUser");
  }
};

export const getClient = async (userId: string) => {
  try {
    const clients = await databases.listDocuments(
      DATABASE_ID!,
      CLIENT_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    );

    return parseStringify(clients.documents[0]);
  } catch (error) {
    handleAppwriteError(error, "getClient");
  }
};

