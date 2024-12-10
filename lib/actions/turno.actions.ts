'use server';

import { ID } from "node-appwrite";
import {
  DATABASE_ID,
  databases,
  TURNOS_COLLECTION_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const crearTurno = async (turno: CreateAppointmentParams) => {
  try {
    const newTurno = await databases.createDocument(
      DATABASE_ID!,
      TURNOS_COLLECTION_ID!,
      ID.unique(),
      turno
    );

    return parseStringify(newTurno);
  } catch (error) {
    console.error("An error occurred while registering user:", error);
  }
};


export const getTurno = async (turnoId: string) => {
  try {
    const turno = await databases.getDocument(DATABASE_ID!, TURNOS_COLLECTION_ID!, turnoId);

    return parseStringify(turno);
  } catch (error) {
    console.error("An error occurred while fetching user:", error);
  }
};