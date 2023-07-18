import { Alert, AlertTitle } from "@mui/material";
import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  // Extract the relevant error message from the Error object
  const errorMessage = error.error ? error.error : error.message;

  return (
    <div>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <strong>{errorMessage}</strong>
      </Alert>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
