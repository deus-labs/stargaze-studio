import { uploadToNftStorage } from './nft-storage'
import { uploadToPinata } from './pinata'

export type UploadServiceType = 'nft-storage' | 'pinata'

export const upload = async (
  fileArray: File[],
  uploadService: UploadServiceType,
  fileType: string,
  nftStorageApiKey: string,
  pinataApiKey: string,
  pinataSecretKey: string,
): Promise<string> => {
  if (uploadService === 'nft-storage') return uploadToNftStorage(fileArray, nftStorageApiKey)
  return uploadToPinata(fileArray, pinataApiKey, pinataSecretKey, fileType)
}
