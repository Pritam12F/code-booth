import axios from "axios";

type ApiResponse = {
  success: boolean;
  message: string | null;
  data: any;
};

export const createBooth = async (
  interviewerId: string,
  intervieweeId: string,
  title: string,
  tasks?: string[]
): Promise<ApiResponse> => {
  try {
    const res = await axios.post(`${process.env.BACKEND_URL}/v1/create-booth`, {
      interviewerId,
      intervieweeId,
      title,
      tasks,
    });

    return {
      success: true,
      message: res.data.message,
      data: null,
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : "Some error occured";

    return { success: false, message: error, data: null };
  }
};

export const fetchBoothById = async (): Promise<ApiResponse> => {
  try {
    const res = await axios.get(`${process.env.BACKEND_URL}/v1/fetch-booth`);

    return {
      success: true,
      message: res.data.message,
      data: res.data.booths,
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : "Some error occured";

    return { success: false, message: error, data: null };
  }
};

export const deleteBooth = async (boothId: string): Promise<ApiResponse> => {
  try {
    const res = await axios.post(`${process.env.BACKEND_URL}/v1/delete-booth`, {
      boothId,
    });

    return {
      success: true,
      message: res.data.message,
      data: null,
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : "Some error occured";

    return { success: false, message: error, data: null };
  }
};

export const fetchAllBooths = async (token: string): Promise<ApiResponse> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/v1/fetch-all-booths`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      message: res.data.message,
      data: null,
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : "Some error occured";

    return { success: false, message: error, data: null };
  }
};
