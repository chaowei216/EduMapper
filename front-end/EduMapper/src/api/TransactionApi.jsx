// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;
export const GetTransactionByUser = async (page, pageSize, userId, status) => {
  try {
    const url = `${baseUrl}/api/Transactions/user/${userId}?Status=${status}&PageNumber=${page}&PageSize=${pageSize}`;
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
