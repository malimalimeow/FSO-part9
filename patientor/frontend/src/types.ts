export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male : "male",
  Female : "female",
  Other : "other"
}as const;

export type Gender = typeof Gender[keyof typeof Gender];


const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge:Discharge
}
export interface Discharge{
    date:string
    criteria:string
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare"
    employerName :string
    sickLeave?:SickLeave
}

export interface SickLeave {
    startDate: string
    endDate: string
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T,K extends string|number|symbol>=T extends unknown ? Omit<T,K>:never
//kinda like a function here T=>type, K=>key, in string/number/symbol(constraint)= (Ternary)when a type extends something? type omit that key 

export type EntryFormValues= UnionOmit<Entry,"id">

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth?: string;
  entries?:Entry[]
}

export type PatientFormValues = Omit<Patient, "id">;

export const EntryType = {
  Hospital: "Hospital",
  OccupationalHealthcare: "OccupationalHealthcare",
  HealthCheck: "HealthCheck",
} as const;

export type EntryTypes = (typeof EntryType)[keyof typeof EntryType];