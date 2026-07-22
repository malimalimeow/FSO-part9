import data from "../../data/diagnoses.ts" with {type:"json"}

import type { Diagnosis } from "../types.ts"

const diagnoses: Diagnosis[]= data as Diagnosis[]

const getData=():Diagnosis[]=>{
    return diagnoses;
}

const addData=()=>{
    return null;
}

export default{
    getData,addData,
}