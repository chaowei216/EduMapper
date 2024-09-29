// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;
export const GetAllNotification = async (page, pageSize) => {
  try {
    const url = `${baseUrl}/api/Notifications/system?PageSize=${pageSize}&PageIndex=${page}`;
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

export const GetNotificationByUser = async (page, pageSize, userId) => {
  try {
    const url = `${baseUrl}/api/Notifications/user/${userId}`;
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