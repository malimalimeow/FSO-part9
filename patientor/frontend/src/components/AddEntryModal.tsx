import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import NewEntry from "./NewEntry";
import { EntryFormValues } from "../types";
import type { Diagnosis } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, values: EntryFormValues) => void;
  error?: string;
  diagnoses: Diagnosis[];
  patientId: string;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  diagnoses,
  patientId,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add New Entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <NewEntry
        onSubmit={onSubmit}
        onCancel={onClose}
        diagnoses={diagnoses}
        patientId={patientId}
      />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
