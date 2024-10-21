// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;
export const GetAllExam = async (page, pageSize) => {
  try {
    const url = (page == undefined && pageSize == undefined) ? `${baseUrl}/api/Exam` : `${baseUrl}/api/Exam?PageNumber=${page}&PageSize=${pageSize}`;
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

export const CreateAllExam = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/api/Exam`, {
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

export const GetResultExam = async (userId, examId) => {
  try {
    const url = `${baseUrl}/api/Exam/user-answers?UserId=${userId}&ExamId=${examId}`;
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