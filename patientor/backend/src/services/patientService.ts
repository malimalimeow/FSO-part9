import data from "../../data/patients.ts" with {type:"json"}

import type { Patients, NonSensitivePatients, NewPatient } from "../types.ts"
import { v1 as uuid } from 'uuid'

let patients: Patients[]= data as Patients[]


//can take all the data, should not export to any file!!
/*const getData=():Patients[]=>{
    return patients;
}*/

const getNonSensitiveData=():NonSensitivePatients[] =>{
return patients.map(({id,name,dateOfBirth,gender,occupation})=>(({id,name,dateOfBirth,gender,occupation})
    
))}

const addData=(data:NewPatient):Patients=>{
    const id = uuid()
    const newPatient:Patients= {id,...data}
    patients = patients.concat(newPatient)
    return newPatient;
}

export default{
    addData,getNonSensitiveData
}