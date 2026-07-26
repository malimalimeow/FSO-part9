import data from "../../data/patients.ts" with {type:"json"}

import type { Patient, NonSensitivePatient, NewPatient } from "../types.ts"
import { v1 as uuid } from 'uuid'

let patients: Patient[]= data as Patient[]


//can take all the data, should not export to any file!!
/*const getData=():Patients[]=>{
    return patients;
}*/

const getNonSensitiveData=():NonSensitivePatient[] =>{
return patients.map(({id,name,dateOfBirth,gender,occupation})=>(({id,name,dateOfBirth,gender,occupation})
    
))}

const addData=(data:NewPatient):Patient=>{
    const id = uuid()
    const newPatient:Patient= {id,...data}
    patients = patients.concat(newPatient)
    return newPatient;
}

export default{
    addData,getNonSensitiveData
}