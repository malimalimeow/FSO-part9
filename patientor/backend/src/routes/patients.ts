import patientService from "../services/patientService.ts";
import express,{type Request, type Response, type NextFunction} from "express";
import { NewPatientSchema,PatientSchema } from "../utils.ts";
import {z} from "zod";
import type{NewPatient ,Patient} from "../types.ts";


const patientRouter=express.Router();

const newPatientParser = (req: Request,_res:Response,next: NextFunction)=>{
  try{NewPatientSchema.parse(req.body);
    next();
  }catch (error:unknown){
    next(error);
  }
};

patientRouter.get("/",(_req,res)=>{
    const patients = patientService.getNonSensitiveData();
    res.json(patients);
});

patientRouter.get("/:id",(req,res,next)=>{
  try{
  const patient= patientService.getOne(req.params.id);
  const parsedPatient= PatientSchema.parse(patient[0]);
  res.json(parsedPatient);
  }catch(error:unknown){
    next(error);
  }

});

patientRouter.post("/", newPatientParser,(req:Request<unknown,unknown,NewPatient>,res:Response<Patient>)=>{
    const response =patientService.addData(req.body);
    res.json(response);
});


const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

patientRouter.use(errorMiddleware);

export default patientRouter;