import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box } from "@mui/system";
import axios from "axios";
import { CircularProgress} from "@mui/material";
import {Typography, Button } from "@mui/material";

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
    <Box
      m="150px 0 0"
    >
        {
            !image && <div {...getRootProps()}>

                <Box
                  border="2px dashed #03001C"
                  width="18rem"
                  height="100px"
                  m="0 auto"
                  display="flex"
                  borderRadius="10px"
                >
                  <input {...getInputProps()} />

                  <Typography variant="h6" sx={{
                      m: "auto",
                      "&:hover": {
                        cursor: "pointer"
                      }
                    }}
                  >Click or Drag & Drop files here </Typography>
                

                </Box>
          </div>

        }

      {paths.map(path => 
        <Box
          borderRadius="10px"
          width="16rem"
          m="0 auto"
        >

          <img key={path} src={path} alt="img"/>
        </Box>
      )}

        {isLoading && <Box
        
            backgroundColor="#FAD3E7"
            width="16rem"
            className="label"
            textAlign="center"
            m="0 auto"
          >
                <CircularProgress color="secondary" sx={{p: "10px 0 0"}}/>
                <Typography variant="h6" noWrap sx={{p: "0 0 10px"}}>
                  Processing
                </Typography>
              </Box>}
        
        {data && <>
            <Box
              backgroundColor="#FAD3E7"
              width="256px"
              className="label"
              textAlign="center"
              m="0 auto"
            >
                <Typography variant="h6" sx={{p: "10px 0 0"}}>
                    label: {data.class}
                </Typography>
                <Typography variant="h6" sx={{p: "0 0 10px"}}>
                    confidence: {confidence}%
                </Typography>

            </Box>
            <Box
              backgroundColor="#FAD3E7"
              border="2px solid #EFA3C8"
              p="5px"
              m="20px auto"
              width="80px"
              textAlign="center"
              borderRadius="5px"
              sx={{
                "&:hover": {
                  backgroundColor: "#EFA3C8",
                  borderColor: "#FAD3E7",
                  cursor: "pointer"
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