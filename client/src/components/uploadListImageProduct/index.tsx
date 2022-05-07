import React, { useState } from "react";
import { storage } from "../firebase";
import { Upload, Image, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const UploadListFile = (props: any) => {
  const { setListUrl, listUrl, edit } = props;
  const formData = new FormData();
  function handleChange(e: any) {
    const file = e.target.files[0];

    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url: string) => {
          console.log("url", url);
          if (!edit) {
            setListUrl([...listUrl, { url }]);
          } else listUrl.push({ url });
        });
    });
  }

  const handleDeleteImage = (index: number) => {
    const newList = listUrl?.filter((item: any, idx: number) => idx !== index);
    setListUrl(newList);
  };

  return (
    <>
      <input
        type="file"
        style={{ color: "#ffffff" }}
        value=""
        placeholder=""
        onChange={handleChange}
      />
      {listUrl && Array.isArray(listUrl) && (
        <div style={{ display: "flex", padding: "10px 0" }}>
          {listUrl?.map((item: { url: string }, index: number) => (
            <div key={index} style={{ position: "relative" }}>
              <Image
                style={{ width: 80, height: 80, padding: "0 5px" }}
                src={item.url}
              />
              <Button
                onClick={() => handleDeleteImage(index)}
                style={{
                  position: "absolute",
                  right: "2px",
                  top: "-13px",
                  padding: "0",
                }}
                type="link"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ fontSize: "16px", color: "#d42424" }}
                />
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default UploadListFile;
