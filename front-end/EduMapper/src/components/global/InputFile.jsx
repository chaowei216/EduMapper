import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFile() {
  const [selectedFile, setSelectedFile] = React.useState([]);

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      const promise = new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      promises.push(promise);
    }

    Promise.all(promises)
      .then((results) => {
        setSelectedFile((prevSelectedFiles) => [
          ...prevSelectedFiles,
          ...results,
        ]);
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };

  const handleDeleteImage = (index) => {
    setSelectedFile((prevSelectedFiles) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload Image
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileInputChange}
          multiple
        />
      </Button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {selectedFile &&
          selectedFile.map((file, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                width="100%"
                style={{
                  width: 100,
                  height: 100,
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                alt={`Image ${index}`}
                src={file}
              />
              <button
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: "3px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                }}
                onClick={() => handleDeleteImage(index)}
              >
                X
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
