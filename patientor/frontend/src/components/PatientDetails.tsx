import type { Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

export const PatientDetails = ({
  showPatient,
}: {
  showPatient: Patient | null;
}) => {
  if (!showPatient) {
    return <p>Loading Patient Data...</p>;
  }
  const GenderIcon =
    showPatient?.gender === "female"
      ? FemaleIcon
      : showPatient?.gender === "male"
        ? MaleIcon
        : TransgenderIcon;

  return (
    <div>
      <h2>
        {showPatient?.name}
        <GenderIcon color="primary" fontSize="large" />
      </h2>
      <p>ssn:{showPatient?.ssn}</p>
      <p>occupation:{showPatient?.occupation}</p>
      <p>date of birth:{showPatient?.dateOfBirth}</p>
    </div>
  );
};
