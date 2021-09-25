import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import service from "../../../utils/axiosConfig";
import { FILE_UPLOAD } from "../../../utils/config";

const FileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onFileChange = (event) => {
    let url = FILE_UPLOAD;
    const data = new FormData();
    let file = event.target.files[0];
    data.append("file", file);
    service
      .postUpload(url, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeUploadHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", uploadedFile, uploadedFile.name);
    console.log(data);
  };

  return (
    <div className="fileUpload">
      <form className="fileUploadForm" onSubmit={onChangeUploadHandler}>
        <TextField label="Upload File" type="file" onChange={onFileChange} />
        <button type="submit">Submit</button>
      </form>
      {uploadedFile ? <img src={uploadedFile} alt="File" /> : null}
    </div>
  );
};

export default FileUpload;
