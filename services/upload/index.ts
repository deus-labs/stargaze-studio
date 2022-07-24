import { uploadToNftStorage } from "./nft-storage"
import { uploadToPinata } from "./pinata"

export const upload = async (fileArray: File[], uploadType: string): Promise<string> => {
    if(uploadType === "NFTStorage")
        return uploadToNftStorage(fileArray)
    return uploadToPinata(fileArray)
}