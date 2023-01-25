import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box } from "@mui/system";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import {Typography, Button } from "@mui/material";
// import Button from "@mui/material";

export default function DropZoneArea() {
  const [paths, setPaths] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null)
  const [image, setImage] = useState(false)
  const [data, setData] = useState()
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = async ()=>{
    if (image) {
        let formData = new FormData()
        formData.append("file", selectedFile)
        let res = await axios.post("https://potato-classification-97z7.onrender.com/predict", formData)

        if (res.status === 200) {
            setData(res.data)
        }

        setIsloading(false)
    }
  }

  useEffect(() => {
    if (!image) {
      return;
    }
    setIsloading(true);
    sendFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);


  const onDrop = useCallback((acceptedFiles) => {
    setPaths(acceptedFiles.map(file => URL.createObjectURL(file)));
    setSelectedFile(acceptedFiles[0])
    setImage(true)

  }, [setPaths]);

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPaths([]);
  };


  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box>
        {
            !image && <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop the files here ...</p>
          </div>

        }

      {paths.map(path => 
        <img key={path} src={path} alt="img"/>
      )}

        {isLoading && <Box>
                <CircularProgress color="secondary"/>
                <Typography variant="h6" noWrap>
                  Processing
                </Typography>
              </Box>}
        
        {data && <>
            <Box>
                <Typography variant="h6">
                    label: {data.class}
                </Typography>
                <Typography variant="h6">
                    confidence: {confidence}%
                </Typography>

            </Box>
            <Box
              backgroundColor="#FAD3E7"
              border="2px solid #EFA3C8"
              p="5px"
              m="5px"
              width="80px"
              textAlign="center"
              borderRadius="5px"
              sx={{
                "&:hover": {
                  backgroundColor: "#EFA3C8",
                  borderColor: "#FAD3E7"
                }
              }}
            >
              <Button
                onClick={clearData}
                sx={{
                  color: "#0081B4"
                }}
              >Clear</Button>
          </Box>
        </>}
        
    </Box>

  );
}