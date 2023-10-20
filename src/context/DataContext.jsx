// DataContext.js
import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [selectedRowData, setSelectedRowData] = useState(null);

  const setContextData = (rowData) => {
    setSelectedRowData(rowData);
  };

  return (
    <DataContext.Provider value={{ selectedRowData, setContextData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
