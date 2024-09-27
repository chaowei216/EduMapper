import { createContext, useEffect, useReducer } from "react";
import {
  GetUserByEmail,
  GetUserByToken,
  LoginExternal,
  Register,
  SignIn,
  VerifyUser,
} from "../api/AuthenApi";
import { isValidToken, setSession } from "../utils/jwtValid";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Messages from "../utils/Message";

//---------------
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  isVerify: false,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user: user,
    };
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),

  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  SEND_OTP: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
      isVerify: true
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  login_type: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  sendOtp: () => Promise.resolve,
});

// ----------------------------------------------------------------------

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const { email } = jwtDecode(accessToken);
        const response = await GetUserByEmail(email);
        const responseJson = await response.json();
        const user = responseJson.metaData;
        console.log(responseJson.metaData);

        if (
          user.roleName == "Admin" &&
          accessToken &&
          isValidToken(accessToken)
        ) {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: user,
            },
          });
        } else if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken, refreshToken);
          const { email } = jwtDecode(accessToken);
          const response = await GetUserByEmail(email);
          const responseJson = await response.json();
          const user = responseJson.metaData;
          if (user.emailConfirmed == false && user.roleName != "Admin") {
            console.log(user.emailConfirmed);
            dispatch({
              type: "SEND_OTP",
              payload: {
                user: user,
              },
            });
          } else {
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                user: user,
              },
            });
          }
          // ne gio sau cai else la se dung` api refresh token neu no tra ve status code 400 thi minh chay cai set
          // session(null) con ra true 200 thi set session la 2 cai responseJson la access va refresh
        } else {
          setSession(accessToken, refreshToken);
          if (accessToken === null || refreshToken === null) {
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: false,
                user: null,
              },
            });
          }
        }
      } catch (err) {
        setSession(null, null);
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const userInput = {
      email: email,
      password: password,
    };

    const response = await SignIn(userInput);
    if (!response.ok) {
      toast.error("Đăng nhập không thành công");
      return;
    }
    const responseJson = await response.json();
    if (responseJson.statusCode == 401) {
      toast.error(responseJson.message);
      return;
    }
    if (
      responseJson.statusCode == 500 &&
      responseJson.message == "Your account is banned"
    ) {
      toast.error("Tài khoản của bạn đã bị cấm, xin vui lòng thử lại sau");
      return;
    }
    const { accessToken, refreshToken, user } = responseJson.metaData;
    //localStorage.setItem("accessToken", accessToken);
    console.log(user);
    if (user.roleName == "Admin") {
      window.localStorage.setItem("accessToken", accessToken);
      dispatch({
        type: "LOGIN",
        payload: {
          user: user,
        },
      });
      return;
    }
    if (user.emailConfirmed == false) {
      dispatch({
        type: "SEND_OTP",
        payload: {
          user: user,
        },
      })
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      const encodedEmail = btoa(email);
      window.location.replace(`/send-otp/${encodedEmail}`);
      return;
    }
    setSession(accessToken, refreshToken);
    dispatch({
      type: "LOGIN",
      payload: {
        user: user,
      },
    });
  };

  const login_type = async (type, user) => {
    const inputUser = {
      fullName: user.fullName,
      email: user.email,
      gender: user.gender,
      dateOfBirth: "2024-09-13T09:40:31.336Z",
      phoneNumber: user.phoneNumber,
      imageLink: user.avatar,
    };
    const response = await LoginExternal(type, inputUser);
    const responseJson = await response.json();
    console.log(responseJson.metaData);
    if (responseJson.statusCode === 200) {
      const { accessToken, user, refreshToken } = responseJson.metaData;

      setSession(accessToken, refreshToken);
      dispatch({
        type: "LOGIN",
        payload: {
          user: user,
        },
      });
      toast.success(Messages.SUCCESS.LOGIN);

      // const timeout = setTimeout(() => {
      //   window.location.replace("/");
      // }, 2000);
      // return () => clearTimeout(timeout);
    }
    return;
  };

  const register = async (registerUser) => {
    console.log(registerUser);
    const response = await Register(registerUser);
    const responseJson = await response.json();
    console.log(responseJson.statusCode);
    if (responseJson.statusCode == 400) {
      toast.error(Messages.ERROR.BAD_REQUEST);
      return;
    }
    const user = responseJson.metaData;
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
    if (responseJson.statusCode == 201) {
      toast.success("Đăng ký thành viên thành công");
      const timeout = setTimeout(() => {
        window.location.replace("/login");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  };

  const sendOtp = (otp, email) => {
    VerifyUser(otp, email).then(response => {
      if (response.statusCode === 200) {
        toast.success("Xác thực thành công");
      } else {
        toast.error("Xác thực không thành công vui lòng thử lại")
        return;
      }
    }).catch(error => {
      console.error("Error:", error.message);
    }).finally(() => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      let user = null;
      GetUserByToken().then(response => {
        if (response.statusCode === 200) {
          user = response.metaData
        }
      }).catch(error => {
        console.error("Error:", error.message);
        toast.error("Xác thực không thành công vui lòng thử lại")
      }).finally(() => {
        if (user == null) {
          return;
        }
        setSession(accessToken, refreshToken);
        dispatch({
          type: "LOGIN",
          payload: {
            user: user,
          },
        });
      })
    })
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          ...state,
          method: "jwt",
          login,
          login_type,
          logout,
          register,
          sendOtp
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
export { AuthContext, AuthProvider };
