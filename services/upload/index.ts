import { uploadToNftStorage } from "./nft-storage"
import { uploadToPinata } from "./pinata"

export const upload = async (fileArray: File[], uploadService: string): Promise<string> => {
    if(uploadService === "NFT Storage")
        return uploadToNftStorage(fileArray)
    return uploadToPinata(fileArray)
}