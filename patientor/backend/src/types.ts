import { z } from 'zod'
import { NewPatientSchema } from "./utils.ts"
export interface Diagnosis {
    code:String;
    name:String;
    latin?:String;
}


export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export const Gender ={ male:'male',female:'female',other:'other'}as const;

export type Gender = typeof Gender[keyof typeof Gender]

export type NewPatient =z.infer<typeof NewPatientSchema>

export interface Patient extends NewPatient{ id:string }