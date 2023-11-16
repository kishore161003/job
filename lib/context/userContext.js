import React from "react";
import { useState, useContext } from "react";
export const MyContext = React.createContext();

function MyProvider({ children }) {
  // Define the state or data you want to provide
  const [myData, setMyData] = useState({
    
  });

  return (
    <MyContext.Provider value={{ myData, setMyData }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyProvider;
