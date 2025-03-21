import { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
  // State to store the API response
  const [data, setData] = useState(null);
  // Optional: State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data using Axios
    axios.get('http://localhost:4000/api')
      .then(response => {
        console.log(response.data); // Log the data (optional)
        setData(response.data);    // Store the response in state
        setLoading(false);         // Update loading state
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.message);     // Store error message
        setLoading(false);         // Update loading state
      });
  }, []); // Empty dependency array means this runs once on mount

  // Render based on state
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          Fetch test
          {/* Example: Display the data */}
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
};

export default Test;