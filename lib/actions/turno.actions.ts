"use server";

import { ID, Query } from "node-appwrite";
import {
  DATABASE_ID,
  databases,
  TURNOS_COLLECTION_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

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
    const turno = await databases.getDocument(
      DATABASE_ID!,
      TURNOS_COLLECTION_ID!,
      turnoId
    );

    return parseStringify(turno);
  } catch (error) {
    console.error("An error occurred while fetching user:", error);
  }
};

export const getTurnosRecientes = async () => {
  try {
    const turnos = await databases.listDocuments(
      DATABASE_ID!,
      TURNOS_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      turnos: 0,
      pending: 0,
      canceled: 0,
    };

    const counts = (turnos.documents as any[]).reduce((acc, turno) => {
      if (turno.status === "scheduled") {
        acc.turnos += 1;
      } else if (turno.status === "pending") {
        acc.pending += 1;
      } else if (turno.status === "canceled") {
        acc.canceled += 1;
      }

      return acc;
    }, initialCounts);

    const data = {
      count: turnos.total,
      ...counts,
      documents: turnos.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error("An error occurred while fetching user:", error);
  }
};

export const actualizarTurno = async ({turnoId,userId,turno,type}: UpdateAppointmentParams) => {
  try {
    const updatedTurno = await databases.updateDocument(
      DATABASE_ID!,
      TURNOS_COLLECTION_ID!,
      turnoId,
      turno
    );

    if(!updatedTurno) {
      throw new Error("Turno no actualizado");
    }

    //TODO: enviar notificacion al cliente

    revalidatePath("/admin");
    return parseStringify(updatedTurno);
  } catch (error) {
    console.error("An error occurred while updating turno:", error);
  }
}