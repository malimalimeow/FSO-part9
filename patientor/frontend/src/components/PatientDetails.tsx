import type { Patient, Diagnosis, Entry } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import "../patientDetail.css";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import EmergencyIcon from "@mui/icons-material/Emergency";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../helper";
import { useState } from "react";
import NewEntry from "./NewEntry";
import { Button } from "@mui/material";

interface PatientDetailProps {
  showPatient: Patient | null;
  diagnoses: Diagnosis[];
}

export const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      const color =
        entry.healthCheckRating === 0
          ? "#2E7D32"
          : entry.healthCheckRating === 1
            ? "#ED6C02"
            : entry.healthCheckRating === 2
              ? "#D32F2F"
              : "#C62828";
      return (
        <div className="entryContainer">
          <p>
            {entry.date}
            <MedicalInformationIcon />
          </p>
          <p>{entry.description}</p>
          <FavoriteIcon sx={{ color: color }} />
          <p>Diagnosed by {entry.specialist}</p>
        </div>
      );
    case "Hospital":
      return (
        <div className="entryContainer">
          <p>
            {entry.date} <LocalHospitalIcon />
          </p>
          <p>{entry.description}</p>
          <p>Diagnosed by {entry.specialist}</p>
        </div>
      );

    case "OccupationalHealthcare":
      return (
        <div className="entryContainer">
          <p>
            {entry.date}
            <EmergencyIcon />
            {entry.employerName}
          </p>
          <p>{entry.description}</p>
          <p>Diagnosed by {entry.specialist}</p>
        </div>
      );

    default:
      return assertNever(entry);
  }
};

const PatientDetails = ({ showPatient, diagnoses }: PatientDetailProps) => {
  if (!showPatient) {
    return <p>Loading Patient Data...</p>;
  }
  const GenderIcon =
    showPatient?.gender === "female"
      ? FemaleIcon
      : showPatient?.gender === "male"
        ? MaleIcon
        : TransgenderIcon;

  const [showModal, setShowModal] = useState<Boolean>(false);
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
        <div key={entry.id}>
          <EntryDetails entry={entry} />
        </div>
      ))}

      <Button onClick={() => setShowModal(true)}>Add New Entry</Button>
      {showModal && (
        <NewEntry setShowModal={setShowModal} diagnoses={diagnoses} />
      )}
    </div>
  );
};

export default PatientDetails;
