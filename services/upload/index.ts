import { uploadToNftStorage } from "./nft-storage"
import { uploadToPinata } from "./pinata"

export const serviceType = {
	NFT_Storage: "NFT Storage",
	Pinata: "Pinata",
}

export const upload = async (fileArray: File[], uploadService: string, fileType?: string): Promise<string> => {
    if(uploadService === serviceType.NFT_Storage)
        return uploadToNftStorage(fileArray)
    return uploadToPinata(fileArray, fileType)
}
