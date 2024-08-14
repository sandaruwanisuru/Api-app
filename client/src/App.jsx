import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [show, setshow] = useState([]);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  useEffect(() => {
    const fetchData = async (longitude, latitude) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/ninjas?lng=-${longitude}&lat=${latitude}`
        );

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setshow(data);
        console.log(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    if (longitude && latitude) {
      fetchData(longitude, latitude);
    }
  }, [longitude, latitude]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Find the Rescuers</h1>
        {show.map((result) => (
          <div className="display" key={result._id}>
            <p>
              Name:
              <span> {result.name}</span>
            </p>
            <p>
              Distance:
              <span>{Math.floor(result.dist.calculated) / 1000} Km</span>
            </p>
          </div>
        ))}
      </div>
      <div className="main">
        <h2>Add Your location</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <label htmlFor="latitude"> Latitude</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default App;
