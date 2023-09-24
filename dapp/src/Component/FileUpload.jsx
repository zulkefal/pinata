import { useState } from "react";
import "./FileUpload.css";
import axios from "axios";

const FileUpload = ({ contract, account}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [imgHash,setImgHash] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS ",
          data: formData,
          headers: {
            pinata_api_key: `d14cd382cead77eb04e4`,
            pinata_secret_api_key: `b9ecc20ce1f4cf7d0c00e0d37b7661fc506a7839d2a19f26e49ecd17cff99f4f`,
            "Content-Type": "multipart/form-data",
          },
        });
        const idd = document.querySelector("#uploadID").value;
        contract.storeFileHash(idd,resFile.data.IpfsHash)
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
  };
 
  const datafromBC = async (e) => {
   
    try {

      const retrieve = document.querySelector("#retrieveID").value;
      const fileHash = await contract.getFileHash(retrieve);
      console.log("i am hash" + fileHash);
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${fileHash}`;
      setImgHash(ImgHash);
    } catch (e) {
      console.error("I am error:", e);
    }
    
  };
  
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">

      <form className="form" onSubmit={handleSubmit}>
          <div className="upper">
          <label htmlFor="file-upload" className="choose">
            Choose Image
          </label>
          <input
            disabled={!account}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
          />
          <input id="uploadID" type="text" placeholder="Enter Unique ID"/>
          <span className="textArea">Image: {fileName}</span>
          <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
        </div>
    
      </form>


      <div className="retrive">
      <input id="retrieveID" type="text" placeholder="Enter Unique ID" />
        <button className="upload" onClick={datafromBC}>
            Retrieve File
          </button>
      </div>
      <div className="display">
      <h2 className="dh2">Retrieved Data From Bio</h2>
          <img src={imgHash} alt="" />
      </div>
    </div>
  );
};
export default FileUpload;