import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState(null);

  return (
    <AuthContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
