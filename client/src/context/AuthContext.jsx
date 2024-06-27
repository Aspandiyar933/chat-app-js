import { createContext, useState, useCallback, useEffect } from "react";
import { postRequest, baseUrl } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  console.log("registerInfo", registerInfo);
  console.log("registerError", registerError);
  console.log("userr", user);
  console.log("login", loginInfo);

  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  const updateRegisterInfo = useCallback((newInfo) => {
    setRegisterInfo((prevInfo) => ({
      ...prevInfo,
      ...newInfo,
    }));
  }, []);

  const updateLoginInfo = useCallback((newInfo) => {
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      ...newInfo,
    }));
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);

      try {
        const response = await postRequest(
          `${baseUrl}/v1/register`,
          registerInfo,
        );

        setIsRegisterLoading(false);

        if (response.error) {
          throw new Error(response.error);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
      } catch (error) {
        console.error("Registration error:", error.message);
        setRegisterError("Failed to register. Please try again later.");
        setIsRegisterLoading(false);
      }
    },
    [registerInfo],
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);
      try {
        const response = await postRequest(`${baseUrl}/v1/login`, loginInfo);
        setIsLoginLoading(false);
        if (response.error) {
          return setLoginError(response);
        }
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
      } catch (error) {
        console.error("Login error:", error.message);
        setLoginError("Failed to register. Please try again later.");
        setIsLoginLoading(false);
      }
    },
    [loginInfo],
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        updateLoginInfo,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
