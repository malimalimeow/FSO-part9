import type { z } from 'zod';
import type { EntrySchema, NewPatientSchema, PatientSchema } from "./utils.ts";
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

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];


export type  BaseEntry =z.infer<typeof EntrySchema>
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge:Discharge
}
interface Discharge{
    date:string
    criteria:string
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare"
    employerName :string
    sickLeave?:SickLeave
}

interface SickLeave {
    startDate: string
    endDate: string
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T,K extends string|number|symbol>=T extends unknown ? Omit<T,K>:never
//kinda like a function here T=>type, K=>key, in string/number/symbol(constraint)= (Ternary)when a type extends something? type omit that key 

type EntryWithoutId= UnionOmit<Entry,"id">

