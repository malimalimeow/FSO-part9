import type { NewPatient, Patient } from "./types.ts";
import { Gender } from "./types.ts";
import { z } from 'zod';


export const NewPatientSchema= z.object({
        name: z.string(),
        dateOfBirth: z.iso.date(),
        ssn: z.string(),
        gender: z.enum(Gender),
        occupation:z.string(),
        entries:z.array(z.unknown()).default([])
       });

export const PatientSchema= NewPatientSchema.extend({ id:z.string() });

export const EntrySchema =z.object({
  
  id: z.string(),
  description: z.string(),
  date:z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
})


 export const parseNewPatient = (object:unknown):NewPatient=>{
   return NewPatientSchema.parse(object);};

  export const parseOnePatient =(object:unknown):Patient=>{
    return PatientSchema.parse(object);
  };


