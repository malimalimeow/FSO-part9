import React, { useState } from "react";
import type {
  Discharge,
  SickLeave,
  Diagnosis,
  EntryTypes,
  EntryFormValues,
  HealthCheckRating,
  BaseEntryForm,
  OccupationalForm,
} from "../types";
import { EntryType } from "../types";
import NewEntryType from "./NewEntryType";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  Button,
} from "@mui/material";

interface NewEntryProps {
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmit: (id: string, values: EntryFormValues) => void;
  patientId: string;
}

const NewEntry = ({
  diagnoses,
  onCancel,
  onSubmit,
  patientId,
}: NewEntryProps) => {
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [code, setCode] = useState<string[]>([]);
  const [type, setType] = useState<EntryTypes>("Hospital");
  const [rating, setRating] = useState<HealthCheckRating>(0);
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });

  console.log(
    date,
    description,
    specialist,
    code,
    type,
    rating,
    discharge,
    employerName,
    sickLeave,
  );

  const handleCodeChange = (event: SelectChangeEvent<typeof code>) => {
    const {
      target: { value },
    } = event;
    setCode(typeof value === "string" ? value.split(",") : value);
  };

  const handleCreate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let basicPack: BaseEntryForm = {
      description: description,
      date: date,
      specialist: specialist,
    };
    if (code.length !== 0) {
      basicPack = { ...basicPack, diagnosisCodes: code };
    }

    if (type === "Hospital") {
      onSubmit(patientId, {
        ...basicPack,
        type: "Hospital",
        discharge: discharge,
      });
    } else if (type === "HealthCheck") {
      onSubmit(patientId, {
        ...basicPack,
        type: "HealthCheck",
        healthCheckRating: rating,
      });
    } else if (type === "OccupationalHealthcare") {
      let OccupationalPack: OccupationalForm = {
        ...basicPack,
        type: "OccupationalHealthcare",
        employerName: employerName,
      };

      if (sickLeave.startDate !== "" && sickLeave.endDate !== "") {
        OccupationalPack = { ...OccupationalPack, sickLeave: sickLeave };
      }

      onSubmit(patientId, OccupationalPack);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreate}>
        <TextField
          select
          fullWidth
          label="type"
          id="type"
          value={type}
          required
          onChange={({ target }) => setType(target.value as EntryTypes)}
        >
          {Object.values(EntryType).map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          value={date}
          type="date"
          required
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          label="Description"
          value={description}
          required
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField
          label="Specialist"
          value={specialist}
          required
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <FormControl fullWidth>
          <InputLabel id="code-label">Diagnoses code</InputLabel>
          <Select
            labelId="code-label"
            id="code"
            multiple
            value={code}
            required
            onChange={handleCodeChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code}-{d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <NewEntryType
          type={type}
          rating={rating}
          discharge={discharge}
          employerName={employerName}
          sickLeave={sickLeave}
          setRating={setRating}
          setDischarge={setDischarge}
          setEmployerName={setEmployerName}
          setSickLeave={setSickLeave}
        />

        <Button type="submit">Save Entry</Button>
      </form>
    </div>
  );
};

export default NewEntry;
