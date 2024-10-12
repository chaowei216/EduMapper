// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;
export const GetAllPassage = async (page, pageSize) => {
  try {
    const url =
      page == undefined && pageSize == undefined
        ? `${baseUrl}/api/Passages`
        : `${baseUrl}/api/Passages?PageNumber=${page}&PageSize=${pageSize}`;
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await fetch(url, request);
    if (!response.ok) {
      console.error("There was a problem with API");
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const CreatePassage = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/api/Passages/ielts`, {
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

export const CreatePassageExceptIelts = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/api/Passages/except-ielts`, {
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

export const AddQuestionToPassage = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/api/Passages/add-to-passage`, {
      method: "PUT",
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

export const GetPassageExceptIelts = async (page, pageSize) => {
  try {
    const url =
      page == undefined && pageSize == undefined
        ? `${baseUrl}/api/Passages/except-ielts`
        : `${baseUrl}/api/Passages/except-ielts?PageNumber=${page}&PageSize=${pageSize}`;
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await fetch(url, request);
    if (!response.ok) {
      console.error("There was a problem with API");
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const GetPassageIelts = async (page, pageSize) => {
  try {
    const url =
      page == undefined && pageSize == undefined
        ? `${baseUrl}/api/Passages/ielts`
        : `${baseUrl}/api/Passages/ielts?PageNumber=${page}&PageSize=${pageSize}`;
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await fetch(url, request);
    if (!response.ok) {
      console.error("There was a problem with API");
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const CreatePassageWithListening = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/api/Passages/listening`, {
      method: "POST",
      headers: {
        //Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: data,
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
