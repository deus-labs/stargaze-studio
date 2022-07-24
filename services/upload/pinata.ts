import axios from 'axios'

const pinataApiKey = "c8c2ea440c09ee8fa639";
const pinataSecretKey = "9d6f42dc01eaab15f52eac8f36cc4f0ee4184944cb3cdbcda229d06ecf877ee7";
const endpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";

export const uploadToPinata = async (fileArray: File[]): Promise<string> => {
    let data  = new FormData();
    data.append('file', fileArray[0]);
    let res = await axios.post(endpoint, data, {
    withCredentials: true,
    headers: {
        'Content-type': "form-data",
        'pinata_api_key': pinataApiKey,
        'pinata_secret_api_key': pinataSecretKey
    }
    })
    console.log(res)
    return res.data.IpfsHash
}