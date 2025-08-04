import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`, // ← 템플릿 리터럴 사용
  }
});

export default instance; // ← 변수명도 맞춰줘야 함
