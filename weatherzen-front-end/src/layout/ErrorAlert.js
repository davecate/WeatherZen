import React from "react";

function ErrorAlert({ error }) {
  // conditional render: if an error occurs, displays a user-friendly error message
  return (
    error && (
      <div className="alert alert-danger m-2">Error: {error.message}</div>
    )
  );
}

export default ErrorAlert;
