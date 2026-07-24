export interface Diagnosis {
    code:String;
    name:String;
    latin?:String;
}

export interface Patients {
    id:String;
    name:String;
    dateOfBirth:String;
    ssn:String;
    gender: String;
    occupation: String;
}

export type NonSensitivePatients = Omit<Patients, 'ssn'>;

export type NewPatient = Omit<Patients, 'id'>;