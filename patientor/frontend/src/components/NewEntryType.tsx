import type { EntryTypes } from "../types";
import { assertNever } from "../helper";

const NewEntryType = ({ type }: { type: EntryTypes | null }) => {
  if (type != null) {
    switch (type) {
      case "HealthCheck":
        return (
          <>
            <p>HealthCheck</p>
          </>
        );
      case "Hospital":
        return (
          <>
            <p>Hospital</p>
          </>
        );

      case "OccupationalHealthcare":
        return (
          <>
            <p>OccupationalHealthcare</p>
          </>
        );

      default:
        return assertNever(type);
    }
  }
};

export default NewEntryType;
