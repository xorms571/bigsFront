import axios from "axios";

const api = axios.create({
  baseURL: "bigsback-production.up.railway.app",
  withCredentials: true,  // 쿠키를 전송할 수 있도록 설정
});

// 요청 인터셉터 - 토큰을 자동으로 추가
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 - 토큰 만료 시 자동으로 새 Access Token을 발급받도록 처리
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Refresh Token을 쿠키로 가져옴
        const response = await api.post("/auth/token");
        // 새로운 Access Token을 localStorage에 저장
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        // 원래 요청에 새로운 Access Token을 추가하고 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
