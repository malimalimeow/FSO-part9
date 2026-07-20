interface BMIData {
    weight:number;
    height:number;
}

const parseArguments =(args:string[]):BMIData=>{
    if(args.length<4)throw new Error("Not enough arguments");
    if(args.length>4)throw new Error("Too many arguments");
    if(!isNaN(Number(args[2]))&& (!isNaN(Number(args[3])))){
        return {
            weight:Number(args[2]),
            height:Number(args[3])
        };
}else{
    throw new Error("Provided values were not numbers");
}};

export const BMICalculator =(weight:number, height:number)=>{
    const heightInMetre=height/100;
    const bmi = weight/(heightInMetre*heightInMetre);
    let result;
    if (bmi<18.4){ result= "Underweight";}
    else if(bmi>25){result="Overweight/obese";}
    else{result= "Normal range";}
    return result;
   
};

if (process.argv[1] === import.meta.filename) {
try{
    const{weight,height}= parseArguments(process.argv);
    console.log(BMICalculator(weight,height));
    
}catch(error:unknown){
    let errorMessage = `Something bad happened`;
    if(error instanceof Error){
        errorMessage +="Error"+error.message;
    }
    console.log(errorMessage);}
    
}

