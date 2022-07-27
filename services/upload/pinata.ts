import axios from 'axios'

const endpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";

export const uploadToPinata = async (fileArray: File[], pinataApiKey: string, pinataSecretKey: string, fileType?: string, ): Promise<string> => {
    console.log("Uploading to Pinata...")
    if(fileType && fileType == "metadata") {
        let data  = new FormData();
        fileArray.forEach((file) => {
            data.append('file', file, "metadata/"+file.name);
        })

        let res = await axios.post(endpoint, data, {
        withCredentials: true,
        headers: {
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretKey
        }
        })
        return res.data.IpfsHash
    } else {
        let data  = new FormData();
        fileArray.forEach((file) => {
            data.append('file', file, "images/"+file.name);
        })

        let res = await axios.post(endpoint, data, {
        withCredentials: true,
        headers: {
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretKey
        }
        })
        return res.data.IpfsHash
    }

}
