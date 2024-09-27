// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;
export const GetAllPassage = async (page, pageSize) => {
  try {
    const url = `${baseUrl}/api/Passages?PageSize=${pageSize}&PageIndex=${page}`;
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
      const response = await fetch(`${baseUrl}/api/Passages`, {
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