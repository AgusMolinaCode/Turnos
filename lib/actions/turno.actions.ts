"use server";

import { ID, Query } from "node-appwrite";
import {
  DATABASE_ID,
  databases,
  TURNOS_COLLECTION_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

// Tipos
interface Turno {
  $id: string;
  status: "scheduled" | "pending" | "canceled";
  [key: string]: any;
}

interface TurnosResponse {
  count: number;
  turnos: number;
  pending: number;
  canceled: number;
  documents: Turno[];
}

// Constantes
const STATUS_COUNT_MAP: Record<string, keyof typeof INITIAL_COUNTS> = {
  scheduled: "turnos",
  pending: "pending",
  canceled: "canceled",
};

const INITIAL_COUNTS = {
  turnos: 0,
  pending: 0,
  canceled: 0,
};

// Clase de error personalizada
class TurnoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TurnoError";
  }
}

// Helper para validar IDs
function validateId(id: string | null | undefined, fieldName: string): asserts id is string {
  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new TurnoError(`${fieldName} es requerido y debe ser un string válido`);
  }
}

// Helper para manejar errores de Appwrite
function handleAppwriteError(error: unknown, operation: string): never {
  console.error(`Error en ${operation}:`, error);
  
  if (error instanceof TurnoError) {
    throw error;
  }
  
  if (error instanceof Error) {
    throw new TurnoError(`${operation} falló: ${error.message}`);
  }
  
  throw new TurnoError(`${operation} falló: Error desconocido`);
}

export const crearTurno = async (turno: CreateAppointmentParams): Promise<string | null> => {
  try {
    if (!turno) {
      throw new TurnoError("Los datos del turno son requeridos");
    }

    const newTurno = await databases.createDocument(
      DATABASE_ID!,
      TURNOS_COLLECTION_ID!,
      ID.unique(),
      turno
    );

    return parseStringify(newTurno);
  } catch (error) {
    handleAppwriteError(error, "crearTurno");
  }
};

export const getTurno = async (turnoId: string): Promise<string | null> => {
  try {
    validateId(turnoId, "turnoId");

    const turno = await databases.getDocument(
      DATABASE_ID!,
      TURNOS_COLLECTION_ID!,
      turnoId
    );

    return parseStringify(turno);
  } catch (error) {
    handleAppwriteError(error, "getTurno");
  }
};

export const getTurnosRecientes = async (): Promise<string | null> => {
  try {
    const turnos = await databases.listDocuments(
      DATABASE_ID!,
      TURNOS_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const counts = (turnos.documents as Turno[]).reduce((acc, turno) => {
      const countKey = STATUS_COUNT_MAP[turno.status];
      if (countKey) {
        acc[countKey] += 1;
      }
      return acc;
    }, { ...INITIAL_COUNTS });

    const data: TurnosResponse = {
      count: turnos.total,
      ...counts,
      documents: turnos.documents as Turno[],
    };

    return parseStringify(data);
  } catch (error) {
    console.error("An error occurred while fetching turnos:", error);
    return null;
  }
};

export const actualizarTurno = async ({
  turnoId,
  userId,
  turno,
  type,
}: UpdateAppointmentParams): Promise<string | null> => {
  try {
    validateId(turnoId, "turnoId");
    validateId(userId, "userId");

    if (!turno || typeof turno !== "object") {
      throw new TurnoError("Los datos del turno son requeridos");
    }

    const updatedTurno = await databases.updateDocument(
      DATABASE_ID!,
      TURNOS_COLLECTION_ID!,
      turnoId,
      turno
    );

    if (!updatedTurno) {
      throw new TurnoError("No se pudo actualizar el turno");
    }

    // TODO: enviar notificación al cliente
    console.log(`Turno ${turnoId} actualizado. Tipo: ${type}`);

    revalidatePath("/admin");
    return parseStringify(updatedTurno);
  } catch (error) {
    handleAppwriteError(error, "actualizarTurno");
  }
};

// export const sendWhatsappMessage = async (userId: string, message: string) => {
//   try {
//     const user = await databases.getDocument(DATABASE_ID!, TURNOS_COLLECTION_ID!, userId);
//     const phone = user?.phone;
//   } catch (error) {
//     console.error("An error occurred while sending whatsapp message:", error);
//   }
// }
