import axios from 'axios'

const service = axios.create({
    headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdGhhcnZhamFuZ2FkYUBnbWFpbC5jb20sNDcsOTM3MDc4NzI3MyxDVVNUT01FUixNakl6TWpJeE5qRTNOemt4TWpBMU5EUTQiLCJpc3MiOiJpbnN1cmVteXRlYW0uY29tIiwiZXhwIjoxNjE4OTAyMjMxfQ.Xy3Jqr6Cy45jJvTnBocnBv_9U9cuw_frhK-vqvrlf1YLo5aODQe8fjaBHspY7GAFMGwFmD83RK3ALJMNcgmC2w"
    }
});

export const postUpload = (url,data) => {
    return service.request({
      method: 'POST',
      url: url,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": sessionStorage.getItem("Authorization")
      }
    })
}

export const getDownload = (path,fileName) => {
    service({
      url: path,
      method: 'GET',   
      responseType: 'blob' // Important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
}

export default service