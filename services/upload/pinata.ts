/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios'
import { PINATA_ENDPOINT_URL } from 'utils/constants'

export type UploadFileType = 'images' | 'metadata'

export const uploadToPinata = async (
  fileArray: File[],
  pinataApiKey: string,
  pinataSecretKey: string,
  fileType: UploadFileType,
): Promise<string> => {
  console.log('Uploading to Pinata...')
  console.log(fileType)
  console.log(PINATA_ENDPOINT_URL)
  const data = new FormData()
  fileArray.forEach((file) => {
    data.append('file', file, `${fileType}/${file.name}`)
  })

  const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
    withCredentials: true,
    headers: {
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretKey,
    },
  })
  return res.data.IpfsHash
}
