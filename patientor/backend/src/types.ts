import type { z } from 'zod';
import type { NewPatientSchema, PatientSchema } from "./utils.ts";
export interface Diagnosis {
    code:string;
    name:string;
    latin?:string;
}


export type NonSensitivePatient = Omit<Patient, 'ssn'|'entries'>;

export const Gender ={ male:'male',female:'female',other:'other'}as const;

export type Gender = typeof Gender[keyof typeof Gender];

export type NewPatient =z.infer<typeof NewPatientSchema>;

export type Patient=z.infer<typeof PatientSchema>;