// import { useState, useEffect, useCallback } from "react";

// const BASE_URL = "http://localhost:5000";

// // Debounce function to limit the rate of API calls
// const debounce = (func, delay) => {
//   let timeoutId;
//   return (...args) => {
//     if (timeoutId) clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func(...args), delay);
//   };
// };

// function App() {
//   const [query, setQuery] = useState("");
//   const [error, setError] = useState("");
//   const [results, setResults] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [selectedSuggestion, setSelectedSuggestion] = useState(""); // To store the selected suggestion

//   // Fetch search results from the backend
//   const fetchResults = useCallback(async (searchQuery) => {
//     if (searchQuery.trim() === "") {
//       setError("Search query cannot be empty.");
//       setResults([]);
//       return;
//     }



//     try {
//       const response = await fetch(
//         `${BASE_URL}/search?q=${encodeURIComponent(searchQuery)}`
//       );
//       const data = await response.json();
//       setResults(data);
//       setError("");
//     } catch (err) {
//       console.error("Error fetching results:", err);
//       setError("An error occurred while searching.");
//     }
//   }, []);

//   // Fetch autocomplete suggestions from the backend
//   const fetchSuggestions = useCallback(async () => {
//     if (query.trim() === "") {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${BASE_URL}/autocomplete?q=${encodeURIComponent(query)}`
//       );
//       const data = await response.json();
//       setSuggestions(data);
//       setShowSuggestions(true);
//     } catch (err) {
//       console.error("Error fetching suggestions:", err);
//       setSuggestions([]);
//     }
//   }, [query]);

//   // Debounced function to fetch suggestions
//   const debouncedFetchSuggestions = useCallback(
//     debounce(fetchSuggestions, 300),
//     [fetchSuggestions]
//   );

//   useEffect(() => {
//     debouncedFetchSuggestions();
//   }, [query, debouncedFetchSuggestions]);

//   // Effect to fetch results when query changes
//   useEffect(() => {
//     if (query.trim() !== "") {
//       fetchResults(query);
//     }
//     else {
//       setResults([]);}
//   }, [query, fetchResults]);

//   // Handle search button click
//   const handleSearch = () => {
//     // Use the selected suggestion if available, otherwise use the current query
//     fetchResults(selectedSuggestion || query);
//     setShowSuggestions(false);
//   };

//   // Handle suggestion click
//   const handleSuggestionClick = (suggestion) => {
//     setQuery(suggestion);
//     setSelectedSuggestion(suggestion); // Update the selected suggestion
//     setShowSuggestions(false);
//     fetchResults(suggestion); // Fetch results immediately with the selected suggestion
//   };

//   // Handle key down event for Enter key
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault(); // Prevent default form submission
//       handleSearch();
//     }
//   };

//   return (
    
//     <div className="h-[100vh] w-[100vw] flex items-center justify-center p-10">
//       <div className="relative flex flex-col w-full max-w-lg">
//         <div className="flex">
//           <input
//             type="text"
//             className="w-full bg-white pl-4 py-2 text-base font-semibold outline-none border border-gray-300 rounded-lg focus:border-blue-500 transition-colors"
//             placeholder="Search"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={handleKeyDown} // Attach keydown event handler
//             onFocus={() => setShowSuggestions(true)}
//             onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
//           />
//           <input
//             type="button"
//             value="Search"
//             className="ml-2 bg-[#D62D78] text-white font-semibold hover:bg-[#b02668] transition-colors rounded-lg py-2 px-4"
//             onClick={handleSearch}
//           />
//         </div>
//         {/* {showSuggestions && suggestions.length > 0 && (
//           // <div className="absolute z-10 w-full mt-12 bg-white border border-gray-300 rounded-lg shadow-lg"> 
//           //   <ul>
//           //     {suggestions.map((suggestion, index) => (
//           //       <li
//           //         key={index}
//           //         className="p-2 cursor-pointer hover:bg-gray-200"
//           //         onMouseDown={() => handleSuggestionClick(suggestion)}
//           //       >
//           //         {suggestion}
//           //       </li>
//           //     ))}
//           //   </ul>
//           // </div>
//         )} */}
//         {error && <div className="text-red-500 mt-2">{error}</div>}
//         {results.length > 0 && (
//           <div className="mt-4">
//             <h2 className="text-lg font-semibold">Doctors</h2>
//             <ul className="list-disc pl-5 mt-2">
//               {results.map((doctor) => (
//                 <li key={doctor.id}>
//                   {doctor.name} - {doctor.specialization}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
  
//   );
// }

// export default App;
import { useState, useEffect, useCallback } from "react";

const BASE_URL = "http://localhost:5000";

// Debounce function to limit the rate of API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

function App() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(""); // To store the selected suggestion
  const [selectedDoctor, setSelectedDoctor] = useState(null); // To store the selected doctor

  // Fetch search results from the backend
  const fetchResults = useCallback(async (searchQuery) => {
    if (searchQuery.trim() === "") {
      setError("Search query cannot be empty.");
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data);
      setError("");
    } catch (err) {
      console.error("Error fetching results:", err);
      setError("An error occurred while searching.");
    }
  }, []);

  // Fetch autocomplete suggestions from the backend
  const fetchSuggestions = useCallback(async () => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/autocomplete?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    }
  }, [query]);

  // Debounced function to fetch suggestions
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    [fetchSuggestions]
  );

  useEffect(() => {
    debouncedFetchSuggestions();
  }, [query, debouncedFetchSuggestions]);

  // Effect to fetch results when query changes
  useEffect(() => {
    if (query.trim() !== "") {
      fetchResults(query);
    } else {
      setResults([]);
    }
  }, [query, fetchResults]);

  // Handle search button click
  const handleSearch = () => {
    // Use the selected suggestion if available, otherwise use the current query
    fetchResults(selectedSuggestion || query);
    setShowSuggestions(false);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSelectedSuggestion(suggestion); // Update the selected suggestion
    setShowSuggestions(false);
    fetchResults(suggestion); // Fetch results immediately with the selected suggestion
  };

  // Handle key down event for Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      handleSearch();
    }
  };

  // Handle doctor click
  // const handleDoctorClick = (doctor) => {
  //   setSelectedDoctor(doctor);
  //   window.history.pushState({ doctor }, "", `#${doctor.id}`);
  // };

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.doctor) {
        setSelectedDoctor(event.state.doctor);
      } else {
        setSelectedDoctor(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center p-10">
      <div className="relative flex flex-col w-full max-w-lg">
        <div className="flex">
          <input
            type="text"
            className="w-full bg-white pl-4 py-2 text-base font-semibold outline-none border border-gray-300 rounded-lg focus:border-blue-500 transition-colors"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Attach keydown event handler
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          />
          <input
            type="button"
            value="Search"
            className="ml-2 bg-[#D62D78] text-white font-semibold hover:bg-[#b02668] transition-colors rounded-lg py-2 px-4"
            onClick={handleSearch}
          />
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {selectedDoctor ? (
          <div className="mt-4 p-4 border border-blue-500 rounded-lg">
            <h2 className="text-lg font-semibold">{selectedDoctor.name}</h2>
            <p>Specialization: {selectedDoctor.specialization}</p>
          </div>
        ) : (
          results.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Doctors</h2>
              <ul className="list-disc pl-5 mt-2">
                {results.map((doctor) => (
                  <li
                    key={doctor.id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    // onClick={() => handleDoctorClick(doctor)}
                  >
                    {doctor.name} - {doctor.specialization}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
