import type { Patient, Diagnosis, Entry } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import "../patientDetail.css";

//helper function
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};
interface PatientDetailProps {
  showPatient: Patient | null;
  diagnoses: Diagnosis[] | null;
}

export const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return; //icon-checkTmr
    case "Hospital":
      return; //icon-checkTmr
    case "OccupationalHealthcare":
      return; //icon-checkTmr
    default:
      return assertNever(entry);
  }
};

export const PatientDetails = ({
  showPatient,
  diagnoses,
}: PatientDetailProps) => {
  if (!showPatient) {
    return <p>Loading Patient Data...</p>;
  }
  const GenderIcon =
    showPatient?.gender === "female"
      ? FemaleIcon
      : showPatient?.gender === "male"
        ? MaleIcon
        : TransgenderIcon;

  console.log(diagnoses);

  return (
    <div>
      <h2>
        {showPatient?.name}
        <GenderIcon color="primary" fontSize="large" />
      </h2>
      <p>ssn:{showPatient?.ssn}</p>
      <p>occupation:{showPatient?.occupation}</p>
      <p>date of birth:{showPatient?.dateOfBirth}</p>

      {showPatient && <h3>Entries</h3>}
      {showPatient?.entries?.map((entry) => (
        <div key={entry.id} className="entryContainer">
          <p>
            {entry.date} <EntryDetails entry={entry} />
          </p>
          <p>{entry.description}</p>
          <ul>
            {entry?.diagnosisCodes?.map((e) => (
              <li key={e}>
                {e} {diagnoses?.find((d) => d.code === e)?.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
