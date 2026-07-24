import patientService from "../services/patientService.ts";
import express from "express"


const patientRouter=express.Router()

patientRouter.get("/",(_req,res)=>{
    const patients = patientService.getNonSensitiveData()
    res.json(patients)
})

patientRouter.post("/",(req,res)=>{
    const newPatient = req.body
    const response =patientService.addData(newPatient)
    res.json(response)
})

export default patientRouter