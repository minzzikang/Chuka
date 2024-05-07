import axios from "axios";

const url = `https://chuka.kr/api/v1`

// 이벤트 등록
export const createEventReg = async (formdata: any) => {
  const accessToken = localStorage.getItem("access_token");
  try {
    const response = await axios.post(`/domain/events`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${accessToken}`,
      },
    });


    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 이벤트 단건 정보 조회
export const fetchEventInfo = async (eventId: string): Promise<any> => {
  try {
    const response = await axios.get(`/domain/events/${eventId}`)
    return response.data

  } catch (err) { 
    console.error(err);
    throw err
  }
};

// 이벤트, 축하메시지 갯수 조회
export const fetchCount = async () => {
  try {
    const response = await axios.get(`/domain/events/count`)
    return response.data
  } catch (err) { 
    console.error(err);
    throw err
  }
}

// 
export const fetchList = async () => {
  try {
    const response = await axios.get(`/domain/events`)
    return response.data
  } catch (err) {
    console.error(err);
    throw err
  }
}