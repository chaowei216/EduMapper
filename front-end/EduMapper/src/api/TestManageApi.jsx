// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;
export const GetTest = async (page, pageSize, filter) => {
  try {
    const url = `${baseUrl}/api/Questions/${filter}?PageNumber=${page}&PageSize=${pageSize}`;
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

export const CreateTestApi = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/api/Tests`, {
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

export const GetReadingTest = async (id) => {
  try {
    const url = `${baseUrl}/api/Tests/${id}/reading`;
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
