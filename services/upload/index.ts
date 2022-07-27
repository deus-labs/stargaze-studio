import { uploadToNftStorage } from "./nft-storage"
import { uploadToPinata } from "./pinata"
import { serviceType } from "pages/collection/upload"

export const upload = async (fileArray: File[], uploadService: string, fileType?: string): Promise<string> => {
    if(uploadService === serviceType.NFT_Storage)
        return uploadToNftStorage(fileArray)
    return uploadToPinata(fileArray, fileType)
}
