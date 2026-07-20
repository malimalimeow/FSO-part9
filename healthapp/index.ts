import express from 'express';
import { BMICalculator } from './bmiCalculator.ts';
import {exerciseCalculate} from './exerciseCalculator.ts';
const app = express();
app.use(express.json());

app.get('/hello',(_req,res)=>{
    res.send('Hello Full Stack!');
});

app.get('/bmi',(req,res)=>{
    try{
    const {height,weight}=req.query;
    
    if(!height||!weight||isNaN(Number(height))|| (isNaN(Number(weight)))){
        throw new Error("malformatted parameters");}

    const result=BMICalculator((Number(weight)),(Number(height)));
    res.json({weight:Number(weight),height:Number(height), bmi:result});}catch(error:unknown){
    let errorMessage = `Something bad happened`;
    if(error instanceof Error){
        errorMessage = error.message;
    }
    res.status(400).json({ error: errorMessage });
   }});

app.post('/exercises',(req,res)=>{
    //validate the data
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {daily_exercises , target }=req.body ;
        if (!daily_exercises ||!target){throw new Error("parameters missing");}
        const data=daily_exercises as unknown[];
        const exerciseData=data.map(d=>Number(d));
        const hasNan = exerciseData.some(e=>isNaN(e));
        if (hasNan||(isNaN(Number(target)))){ throw new Error("malformatted parameters");}

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = exerciseCalculate(daily_exercises,target);
        res.json(result);     
    }catch(error:unknown){
    let errorMessage = `Something bad happened`;
    if(error instanceof Error){
        errorMessage = error.message;
    }
    res.status(400).json({ error: errorMessage });
   }});



const PORT = 3003;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});