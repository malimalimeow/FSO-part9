import type { Patient, Diagnosis, Entry, EntryFormValues } from "../types";
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
import { Button } from "@mui/material";
import AddEntryModal from "./AddEntryModal";
import patientService from "../services/patients";
import axios from "axios";

interface PatientDetailProps {
  showPatient: Patient | null;
  diagnoses: Diagnosis[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
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

const PatientDetails = ({
  showPatient,
  diagnoses,
  setPatients,
}: PatientDetailProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!showPatient) {
    return <p>Loading Patient Data...</p>;
  }
  const GenderIcon =
    showPatient?.gender === "female"
      ? FemaleIcon
      : showPatient?.gender === "male"
        ? MaleIcon
        : TransgenderIcon;

  const submitNewEntry = async (id: string, values: EntryFormValues) => {
    try {
      const newEntry = await patientService.addEntry(id, values);
      setPatients((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          return {
            ...p,
            entries: p.entries ? [...p.entries, newEntry] : [newEntry],
          };
        }),
      );
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
        patientId={showPatient.id}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientDetails;
