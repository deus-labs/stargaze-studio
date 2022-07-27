import { uploadToNftStorage } from './nft-storage'
import { uploadToPinata } from './pinata'

export const serviceType = {
  NFT_Storage: 'NFT Storage',
  Pinata: 'Pinata',
}

export const upload = async (
  fileArray: File[],
  uploadService: string,
  fileType: string,
  nftStorageApiKey: string,
  pinataApiKey: string,
  pinataSecretKey: string,
): Promise<string> => {
  if (uploadService === serviceType.NFT_Storage) return uploadToNftStorage(fileArray, nftStorageApiKey)
  return uploadToPinata(fileArray, pinataApiKey, pinataSecretKey, fileType)
}
