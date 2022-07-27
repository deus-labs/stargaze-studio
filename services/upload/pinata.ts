/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios'

const endpoint = 'https://api.pinata.cloud/pinning/pinFileToIPFS'

export const uploadToPinata = async (
  fileArray: File[],
  pinataApiKey: string,
  pinataSecretKey: string,
  fileType?: string,
): Promise<string> => {
  console.log('Uploading to Pinata...')
  if (fileType && fileType === 'metadata') {
    const data = new FormData()
    fileArray.forEach((file) => {
      data.append('file', file, `metadata/${file.name}`)
    })

    const res = await axios.post(endpoint, data, {
      withCredentials: true,
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretKey,
      },
    })
    return res.data.IpfsHash
  }
  const data = new FormData()
  fileArray.forEach((file) => {
    data.append('file', file, `images/${file.name}`)
  })

  const res = await axios.post(endpoint, data, {
    withCredentials: true,
    headers: {
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretKey,
    },
  })
  return res.data.IpfsHash
}
