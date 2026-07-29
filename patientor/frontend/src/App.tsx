import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import { PatientDetails } from "./components/PatientDetails";
import diagnosesService from "./services/diagnosesService";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showPatient, setShowPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis | null>(null);

  useEffect(() => {
    void axios.get<String>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchPatientList();
    void fetchDiagnoses();
  }, []);

  const getOnePatient = async (id: string) => {
    setShowPatient(null);
    const patient = await patientService.getOne(id);
    setShowPatient(patient);
  };

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                  getOnePatient={getOnePatient}
                />
              }
            />

            <Route
              path="/api/patients/:id"
              element={
                <PatientDetails
                  showPatient={showPatient}
                  diagnoses={diagnoses}
                />
              }
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
