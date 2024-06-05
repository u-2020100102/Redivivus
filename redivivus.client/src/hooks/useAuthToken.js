import { useState, useEffect } from "react";

const useAuthToken = (tokenKey = "authToken") => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    setHasToken(!!token);
  }, [tokenKey]);

  return hasToken;
};

export default useAuthToken;
