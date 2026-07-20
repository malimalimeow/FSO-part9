interface ExerciseData {
    exercise:number[];
    target:number
}

const parseArguments =(args:string[]):ExerciseData=>{
    if(args.length<4)throw new Error("Not enough arguments");
    if(args.length>4)throw new Error("Too many arguments");
    
    const targetHour= Number(args[2]);
    const data=(JSON.parse(args[3]!))as unknown[];
    const exerciseData=data.map(d=>Number(d));
    const hasNan = exerciseData.some(e=>isNaN(e));

    if ((!hasNan)&&(!isNaN(targetHour))){
        return {
            exercise:exerciseData,
            target:targetHour
        };
    }else{
     console.log(args);
    throw new Error("Provided values were not numbers");

}};

export const exerciseCalculate=(exercise:number[],target:number)=>{
    const markDays=exercise.length;
    const trainingDays=exercise.filter(e=>e!==0).length;
    const averageTrain = exercise.reduce((a,b)=>a+b,0)/markDays;
    const success= averageTrain>=target;
    const rating = success?3:target-averageTrain<0.5?2:1;
    const rating_description={1:"Need to put more effort!",2:'not too bad but could be better',3:"Nice!keep going"};

    const result={
         periodLength: markDays,
  trainingDays: trainingDays,
  success: success,
  rating: rating,
  ratingDescription: rating_description[rating],
  target: target,
  average:averageTrain
    };

    return result;
};

if (process.argv[1] === import.meta.filename) {
    try{
        const{exercise,target}= parseArguments(process.argv);
         console.log(exerciseCalculate(exercise,target));
    
    }catch(error:unknown){
        let errorMessage = `Something bad happened`;
        if(error instanceof Error){
        errorMessage +="Error"+error.message;
        }
        console.log(errorMessage);}}
    
