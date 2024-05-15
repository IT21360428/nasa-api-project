import { useEffect, useState } from "react";
import Footer from "./Footer";
import Main from "./Main";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [camera, setCamera] = useState(localStorage.getItem("camera") || "");
  const [sol, setSol] = useState(localStorage.getItem("sol") || "");
  const SESSION_TIMEOUT = 3600000; // 1 hour in milliseconds

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  function handleSearch() {
    fetchAPIData(camera, sol);
  }

  async function fetchAPIData(camera, sol) {
    setLoading(true);
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${NASA_KEY}`;

    if (sol) {
      url += `&sol=${sol}`;
    } else {
      url += `&sol=1000`; // default sol if none specified
    }

    if (camera) {
      url += `&camera=${camera}`;
    } 
    // else {
    //   url += `&camera="MAST"`; // default camera if none specified
    // }

    const today = new Date().toDateString();
    const sessionKey = `NASA-${today}-${camera}-${sol}`;

    const savedSession = sessionStorage.getItem(sessionKey);
    if (savedSession) {
      const { timestamp, apiData } = JSON.parse(savedSession);
      const currentTime = new Date().getTime();

      if (currentTime - timestamp < SESSION_TIMEOUT) {
        setData(apiData.photos);
        console.log("Fetched from session storage");
        setLoading(false);
        return;
      } else {
        sessionStorage.removeItem(sessionKey); // Session expired
      }
    }

    try {
      const res = await fetch(url);
      const apiData = await res.json();
      const sessionData = {
        timestamp: new Date().getTime(),
        apiData,
      };
      sessionStorage.setItem(sessionKey, JSON.stringify(sessionData));
      setData(apiData.photos);
      console.log("Fetched from API today");
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    // Fetch data on initial render if camera or sol are provided
    if (camera || sol) {
      fetchAPIData(camera, sol);
    }
  }, [camera, sol]);


  useEffect(() => {
    localStorage.setItem("camera", camera);
  }, [camera]);

  useEffect(() => {
    localStorage.setItem("sol", sol);
  }, [sol]);

  return (
    <>
      <div className="searchBar">
      <select
          value={camera}
          onChange={(e) => setCamera(e.target.value)}
        >
          <option value="">Select Camera</option>
          <option value="FHAZ">Front Hazard Avoidance Camera</option>
          <option value="RHAZ">Rear Hazard Avoidance Camera</option>
          <option value="MAST">Mast Camera</option>
          <option value="CHEMCAM">Chemistry and Camera Complex</option>
          <option value="NAVCAM">Navigation Camera</option>
          <option value="PANCAM">Panoramic Camera</option>
        </select>
        
        <input
          type="number"
          placeholder="Search by sol"
          value={sol}
          onChange={(e) => setSol(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      ) : (
        <>
          {data.length > 0 && <Main data={data} />}
          
          
        </>
      )}
    </>
  );
}

export default App;
