
import './App.css'
import Pinata from "../../artifacts/contracts/Upload.sol/FileHashStorage.json"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from './Component/FileUpload';

function App() {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await (await signer).getAddress();
        //console.log(address)
        setAccount(address);
        let contractAddress = "0x425a02f6FC90B89d56F3f7f57b019F9CE25147F8";

        const contract = new ethers.Contract(
          contractAddress,
          Pinata.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);

        
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);



  return (
    <>

    <div className="main">
    <h2 className='heading'>Decentralized Drive</h2>
    </div>
     <FileUpload
          account={account}
          contract={contract}
        ></FileUpload>
    </>
    
  )
}

export default App
