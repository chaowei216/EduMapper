import { createContext, useEffect, useReducer } from "react";
import {
  GetUserByEmail,
  LoginExternal,
  RegisterParent,
  RegisterTutor,
  SignIn,
} from "../api/AuthenApi";
import { isValidToken, setSession } from "../utils/jwtValid";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

//---------------
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  isVerify: false,
  tempUser: null,
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
      user,
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

  REGISTER_TUTOR: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
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
  register_tutor: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};
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
        const user = responseJson.data;
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
          const user = responseJson.data;
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: user,
            },
          });
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
    if (responseJson.statusCode == 400) {
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
    const { token, user } = responseJson.data;
    //localStorage.setItem("accessToken", accessToken);
    console.log(token.accessToken);
    if (user.roleName == "Admin") {
      window.localStorage.setItem("accessToken", token.accessToken);
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
      return;
    }
    setSession(token.accessToken, token.refreshToken);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const login_type = async (user) => {
    console.log(user);
    // if (res) {
    //   const response = await LoginExternal(type, {
    //     fullName: res.user.displayName,
    //     email: res.user.email,
    //     avatar: res.user.photoURL,
    //   });
    // const response = await SignIn(userInput);
    //   console.log(response);
    //   if (response.status === 200) {
    //     const { accessToken, user, refreshToken } = response.data.metaData;
    //     await setSession(accessToken, refreshToken);
    //     dispatch({
    //       type: "LOGIN",
    //       payload: {
    //         user,
    //       },
    //     });
    //     window.location.href = "/";
    //     toast.success(response.message);
    //   }
    // } else {
    //   toast.error("Fail to login external");
    // }
    return;
  };

  const register = async (parents) => {
    // Tạo một Blob từ chuỗi string
    const blob = new Blob([parents.image], { type: "image/jpeg" }); // Thay 'image/jpeg' bằng kiểu dữ liệu của hình ảnh của bạn nếu cần
    const formData = new FormData();
    formData.append("Fullname", parents.fullName);
    formData.append("Email", parents.email);
    formData.append("Password", parents.password);
    formData.append("Phonenumber", parents.phoneNumber);
    formData.append("DateOfBirth", parents.dateOfBirth);
    formData.append("Address", parents.address);
    formData.append("District", parents.district);
    formData.append("City", parents.city);
    formData.append("Gender", parents.gender);
    // formData.append("imageFile", parents.image);
    formData.append("imageFile", blob, parents.image);
    console.log(formData);
    const response = await RegisterParent(formData);
    const responseJson = await response.json();
    console.log(responseJson.statusCode);
    if (responseJson.statusCode == 400) {
      toast.error(responseJson.message);
      return;
    }
    const user = responseJson.data;
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
    if (responseJson.statusCode == 201) {
      toast.success("Đăng ký làm phụ huynh thành công");
      const timeout = setTimeout(() => {
        window.location.replace("/login");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const register_tutor = async (tutor) => {
    const formData = new FormData();
    formData.append("Fullname", tutor.fullName);
    formData.append("Email", tutor.email);
    formData.append("Password", tutor.password);
    formData.append("Phonenumber", tutor.phoneNumber);
    formData.append("DateOfBirth", tutor.dateOfBirth);
    formData.append("Address", tutor.address);
    formData.append("District", tutor.district);
    formData.append("City", tutor.city);
    formData.append("Gender", tutor.gender);
    formData.append("IdentityNumber", tutor.idCart);
    formData.append("Job", tutor.job);
    formData.append("Major", tutor.major);

    for (let i = 0; i < tutor.imageUser.length; i++) {
      formData.append("imageFile", tutor.imageUser[i]);
    }
    for (let i = 0; i < tutor.imageIdentity.length; i++) {
      formData.append("idenFiles", tutor.imageIdentity[i]);
    }

    for (let i = 0; i < tutor.imageCertificate.length; i++) {
      formData.append("cerFiles", tutor.imageCertificate[i]);
    }

    // Upload ảnh chứng chỉ
    for (const cerFileName of tutor.imageCertificate) {
      const cerFile = await fetch(cerFileName)
        .then((response) => response.blob())
        .then(
          (blob) => new File([blob], `${cerFileName}`, { type: "image/jpeg" })
        );
      formData.append("cerFiles", cerFile);
    }

    console.log(formData);
    const response = await RegisterTutor(formData);
    const responseJson = await response.json();
    if (responseJson.statusCode == 400) {
      toast.error(responseJson.message);
      return;
    }
    const user = responseJson.data;
    dispatch({
      type: "REGISTER_TUTOR",
      payload: {
        user,
      },
    });
    if (responseJson.statusCode == 201) {
      toast.success("Đăng ký làm gia sư thành công");
      const timeout = setTimeout(() => {
        window.location.replace("/login");
      }, 2000);
      return () => clearTimeout(timeout);
    }
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
          register_tutor,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
export { AuthContext, AuthProvider };