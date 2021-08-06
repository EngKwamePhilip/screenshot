import React, { useState, useEffect} from 'react';
import './App.css';



function App() {

  const API_KEY = "bae204ef396649168f81d0d86f1b66d8"
  const [search, setSearch] = useState("https://www.brescadc.com/");
  const [img, setImg] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const URL = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${search}&full_page="true"&fresh="true"`;

  const getSreenshot = async() => {
    setSearch("");
    setError(false);
    setLoading(true);
    const response = await fetch(URL);
    if (response.ok){
      setImg(response);
      setLoading(false);
    }
    else{
      setError(true);
    }
  }

  const searchScreenShots = (e) => {
    e.preventDefault();
    getSreenshot();
  };

  useEffect(()=>{
    setSearch("");
    getSreenshot();
  },[])

  
  
  return (
    <div className="App">
      <nav>
        <div className="container">
          <form onSubmit={searchScreenShots}>
            <input type="text"
            placeholder="Enter Valid URL Here"
            autoFocus
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            <button type="submit">Take Screenshot</button>
          </form>
        </div>
      </nav>

      <div className="hero">
        {!loading && !error ? (
          <div className="container">
            {img && (
            <a href={img.url} target="_blank">
              <img src={img.url} alt="background" />   
            </a>
          )} 
          </div>
          ) : !error && loading ? (
            <div className="loading"></div> 
          ): error ? (
            <div className="container">
              <h2>Please Enter a Valid URL</h2>
            </div>
          ) : (
            ""
          )}
      </div>
    </div>
  );
}

export default App;
