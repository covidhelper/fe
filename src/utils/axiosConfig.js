import axios from "axios";

const service = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const postUpload = (url, data) => {
  return service.request({
    method: "POST",
    url: url,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: sessionStorage.getItem("Authorization"),
    },
  });
};

export const getDownload = (path, fileName) => {
  service({
    url: path,
    method: "GET",
    responseType: "blob", // Important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); //or any other extension
    document.body.appendChild(link);
    link.click();
  });
};

export default service;
