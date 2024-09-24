// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;
export const GetAllMemberShip = async (page, pageSize) => {
  try {
    const url = `${baseUrl}/api/MemberShips?PageSize=${pageSize}&PageIndex=${page}`;
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

export const CreateMemberShip = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/api/MemberShips`, {
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

export const UpdateMemberShip = async (memberShipId, data) => {
  try {
    const response = await fetch(`${baseUrl}/api/MemberShips/${memberShipId}`, {
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

export const DeleteMemberShip = async (memberShipId) => {
  try {
    const response = await fetch(`${baseUrl}/api/MemberShips/${memberShipId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
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
