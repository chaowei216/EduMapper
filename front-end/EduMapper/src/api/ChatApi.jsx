// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;
export const GetAllChat = async () => {
  try {
    const url = `${baseUrl}/api/Messages`;
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
