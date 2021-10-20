import { useEffect, useState } from "react";
import { listObservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Home() {
  // state variables for displaying observation data and error messages
  const [observations, setObservations] = useState([]);
  const [error, setError] = useState(null);

  // effect hook to fetch data from the API
  useEffect(() => {
    const abortController = new AbortController();
    listObservations(abortController.signal)
      .then(setObservations)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  // maps observation data to a table
  const tableRows = observations.map((observation) => (
    <tr key={observation.observation_id}>
      <th scope="row">{observation.observation_id}</th>
      <td>{observation.latitude}</td>
      <td>{observation.longitude}</td>
      <td>{observation.sky_condition}</td>
      <td>{observation.created_at}</td>
      {/* edit button */}
    </tr>
  ));

  return (
    <main>
      <h1>Home</h1>
      {/* if an error occurs while fetching data, displays error here */}
      <ErrorAlert error={error} />
      {/* displays table of observation data here */}
      <table className="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Latitude</th>
          <th scope="col">Longitude</th>
          <th scope="col">Sky Condition</th>
          <th scope="col">Created</th>
        </tr>
        </thead>
        <tbody>
        {tableRows}
        </tbody>
      </table>
    </main>
  );
}

export default Home;