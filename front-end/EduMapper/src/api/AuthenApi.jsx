// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;

//ham test login mot co api cua prj thi thay doi
export const SignIn = async (value) => {
  try {
    const url = `${baseUrl}/api/Auth/login`;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(value),
    };
    const response = await fetch(url, request);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const Register = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/api/Auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("There was a problem with API");
    }
    return response;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const RefreshToken = (refreshToken) => {
  const url = `${baseUrl}/api/Auth/refresh-token`;
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({ refreshToken }),
  };

  return fetch(url, request)
    .then((response) => {
      if (!response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        throw new Error("Failed to refresh token");
      }
      return response.json();
    })
    .catch((err) => {
      console.error(err);
      return;
    });
};

//ham test GetUser mot co api cua prj thi thay doi
export const GetUserByEmail = async (email) => {
  try {
    const url = `${baseUrl}/api/Users/email/${email}`;
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await fetch(url, request);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const SendVerifyEmail = (email) => {
  const url = `${baseUrl}/api/Auth/verify-email`;
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({ email }),
  };

  return fetch(url, request)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed");
      }
      return response.json();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const VerifyUser = (otp, email) => {
  const url = `${baseUrl}/api/Auth/confirm-email`;
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({ token: otp, email: email }),
  };

  return fetch(url, request)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed");
      }
      return response.json();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const ForgotPasswordApi = async (email) => {
  try {
    const url = `${baseUrl}/api/Auth/forgot-password`;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetch(url, request);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const GetUserByToken = () => {
  const url = `${baseUrl}/api/Auth/me`;
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  return fetch(url, request)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed");
      }
      return response.json();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const ResetPassword = async (otp, password, email) => {
  try {
    const url = `${baseUrl}/api/Auth/reset-password`;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ email: email, token: otp, newPassword: password }),
    };
    const response = await fetch(url, request);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const Logout = async (refreshToken) => {
  try {
    const url = `${baseUrl}/api/Auth/logout`;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    };
    const response = await fetch(url, request);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const LoginExternal = async (type, user) => {
  console.log(user);
  try {
    const url = `${baseUrl}/api/Auth/login-external?type=${type}`;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(url, request);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const UpdatePassword = async (currentPassword, newPassword) => {
  const data = {
    currentPassword: currentPassword,
    newPassword: newPassword,
  };
  try {
    const url = `${baseUrl}/api/Auth/change-password`;
    const request = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, request);
    return response;
  } catch (err) {
    console.log(err);
  }
};
