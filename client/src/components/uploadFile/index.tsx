import React, { useState } from "react";
import { storage } from "../firebase";
import { Upload, Image } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
const UploadFile = (props: any) => {
  const { setUrl, url } = props;
  const formData = new FormData();
  function handleChange(e: any) {
    const file = e.target.files[0];

    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setUrl(url);
        });
    });
  }

  return (
    <div>
      <input
        type="file"
        style={{ color: "#ffffff" }}
        value=""
        placeholder=""
        onChange={handleChange}
      />
      {url && (
        <Image style={{ width: 80, height: 80, marginTop: 20 }} src={url} />
      )}
    </div>
  );
};
export default UploadFile;
