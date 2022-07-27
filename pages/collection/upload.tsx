import clsx from 'clsx'
import Anchor from 'components/Anchor'
import Button from 'components/Button'
import { useCollectionStore } from 'contexts/collection'
import { setBaseTokenUri, setImage } from 'contexts/collection'
import { useWallet } from 'contexts/wallet'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { withMetadata } from 'utils/layout'
import { links } from 'utils/links'
import { naturalCompare } from 'utils/sort'
import { Conditional } from 'components/Conditional'
import { upload } from 'services/upload'
import { Alert } from 'components/Alert'
import { serviceType } from 'services/upload'
import { MetadataModal } from 'components/MetadataModal'
import { StyledInput } from 'components/forms/StyledInput'

let imageFilesArray: File[] = [];
let metadataFilesArray: File[] = [];
let updatedMetadataFilesArray: File[] = [];

const UploadPage: NextPage = () => {
  const wallet = useWallet()
  const baseTokenURI = useCollectionStore().base_token_uri
  
  const [uploadMethod, setUploadMethod] = useState('New')
  const [uploadService, setUploadService] = useState(serviceType.NFT_Storage)
  const [metadataFileArrayIndex, setMetadataFileArrayIndex] = useState(0)
  const [refreshMetadata, setRefreshMetadata] = useState(false)
  const [nftStorageApiKey, setNftStorageApiKey] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJBODk5OGI4ZkE2YTM1NzMyYmMxQTRDQzNhOUU2M0Y2NUM3ZjA1RWIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NTE5MTcwNDQ2MiwibmFtZSI6IlRlc3QifQ.IbdV_26bkPHSdd81sxox5AoG-5a4CCEY4aCrdbCXwAE')
  const [pinataApiKey, setPinataApiKey] = useState('c8c2ea440c09ee8fa639')
  const [pinataSecretKey, setPinataSecretKey] = useState('9d6f42dc01eaab15f52eac8f36cc4f0ee4184944cb3cdbcda229d06ecf877ee7')
  
  const imageFilesRef = useRef<HTMLInputElement>(null)
  const metadataFilesRef = useRef<HTMLInputElement>(null)

  const handleChangeBaseTokenUri = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setBaseTokenUri(event.target.value.toString())
  }

  const handleChangeImage = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setImage(event.target.value.toString())
  }

  const selectImages = (event: ChangeEvent<HTMLInputElement>
  ) => {
      imageFilesArray = []
      console.log(event.target.files)
      let reader: FileReader;
      if (event.target.files === null)
        return;
      for(let i = 0; i < event.target.files?.length;i++){
        reader = new FileReader(); 
        reader.onload = function(e){
          if (!e.target?.result) return toast.error('Error parsing file.')
          if (!event.target.files) return toast.error('No files selected.')
          let imageFile = new File(
            [e.target.result],
            event.target.files[i].name,
            { type: 'image/jpg' }
          )
          imageFilesArray.push(imageFile)
        }
        if (!event.target.files) return toast.error('No file selected.')
        reader.readAsArrayBuffer(event.target.files[i]);
        reader.onloadend = function(e){
          imageFilesArray.sort((a, b) => naturalCompare(a.name, b.name))
        }
      }
  }
  
  const selectMetadata = (event: ChangeEvent<HTMLInputElement>) => {
    metadataFilesArray = []
    updatedMetadataFilesArray = []
    console.log(imageFilesArray)
    console.log(event.target.files)
    let reader: FileReader
    if (event.target.files === null)
       return toast.error('No files selected.')
    for (let i = 0; i < event.target.files?.length; i++) {
      reader = new FileReader()
      reader.onload = function (e) {
        if (!e.target?.result) return toast.error('Error parsing file.')
        if (!event.target.files)
          return toast.error('No files selected.')
        let metadataFile = new File(
          [e.target.result],
            event.target.files[i].name,
          { type: 'image/jpg' }
        )
        metadataFilesArray.push(metadataFile)
      }
      if (!event.target.files) return toast.error('No file selected.')
      reader.readAsText(event.target.files[i], 'utf8')
      reader.onloadend = function(e){
        metadataFilesArray.sort((a, b) => naturalCompare(a.name, b.name))
        console.log(metadataFilesArray)
      }
    }
  }
  const updateMetadata = async () => {
    console.log(imageFilesArray)
    const imageURI = await upload(imageFilesArray, uploadService, "images", nftStorageApiKey, pinataApiKey, pinataSecretKey)
    console.log(imageURI)
    updatedMetadataFilesArray = []
    let reader: FileReader
    for (let i = 0; i < metadataFilesArray.length; i++) {
      reader = new FileReader()
      reader.onload = function (e) {
        let metadataJSON = JSON.parse(e.target?.result as string)
        metadataJSON.image = `ipfs://${imageURI}/${imageFilesArray[i].name}`
        let metadataFileBlob = new Blob([JSON.stringify(metadataJSON)], {
          type: 'application/json',
        })
        let updatedMetadataFile = new File(
          [metadataFileBlob],
          metadataFilesArray[i].name,
          { type: 'application/json' }
        )
        updatedMetadataFilesArray.push(updatedMetadataFile)
        console.log(updatedMetadataFile.name + ' => ' + metadataJSON.image)
        if (i === metadataFilesArray.length - 1) {
          uploadUpdatedMetadata()
        }
      }
      reader.readAsText(metadataFilesArray[i], 'utf8')
    }
  }
  const uploadUpdatedMetadata = async () => {
    const baseTokenURI = await upload(updatedMetadataFilesArray, uploadService, "metadata", nftStorageApiKey, pinataApiKey, pinataSecretKey)
    setBaseTokenUri("ipfs://" + baseTokenURI)
    console.log("ipfs://" + baseTokenURI)
  }

  const updateMetadataFileIndex = async (index: number) => {
    setMetadataFileArrayIndex(index)
    setRefreshMetadata((prev) => !prev)
  }

  const updateMetadataFileArray = async (updatedMetadataFile: File) => {
    metadataFilesArray[metadataFileArrayIndex] = updatedMetadataFile
    console.log("Metadata File:")
    console.log(JSON.parse(await metadataFilesArray[metadataFileArrayIndex]?.text()))
  }

  return (
    <div>
      <NextSeo title="Create Collection" />
      
      <div className="space-y-8 mt-5 text-center">
        <h1 className="font-heading text-4xl font-bold">
          Upload Assets & Metadata
        </h1>
        
        <p>
          Make sure you check our{' '}
          <Anchor
            href={links['Docs']}
            className="font-bold text-plumbus hover:underline"
          >
            documentation
          </Anchor>{' '}
          on how to create your collection
        </p>
      </div>

      <hr className="border-white/20" />

      <div className="justify-items-start mt-5 mb-3 ml-3 flex-column">
        <div className="mt-3 ml-4 form-check form-check-inline">
          <input
            className="float-none mr-2 mb-1 w-4 h-4 align-middle bg-white checked:bg-stargaze bg-center bg-no-repeat bg-contain rounded-full border border-gray-300 checked:border-white focus:outline-none transition duration-200 appearance-none cursor-pointer form-check-input"
            type="radio"
            name="inlineRadioOptions1"
            id="inlineRadio1"
            value="Existing"
            onClick={() => {
              setUploadMethod('Existing')
            }}
            onChange={() => { }}
            checked={uploadMethod === 'Existing'}
          />
          <label
            className="inline-block text-white cursor-pointer form-check-label"
            htmlFor="inlineRadio1"
          >
            Use an existing URI
          </label>
        </div>
        
        <div className="mt-3 ml-4 form-check form-check-inline">
          <input
            className="float-none mr-2 mb-1 w-4 h-4 align-middle bg-white checked:bg-stargaze bg-center bg-no-repeat bg-contain rounded-full border border-gray-300 checked:border-white focus:outline-none transition duration-200 appearance-none cursor-pointer form-check-input"
            type="radio"
            name="inlineRadioOptions2"
            id="inlineRadio2"
            value="New"
            onClick={() => {
              setUploadMethod('New')
            }}
            onChange={() => { }}
            checked={uploadMethod === 'New'}
          />
          <label
            className="inline-block text-white cursor-pointer form-check-label"
            htmlFor="inlineRadio2"
          >
            Upload assets & metadata
          </label>
        </div>
        {baseTokenURI && (<Alert className="mt-5" type='info'><a target="_blank" href={baseTokenURI}>Base Token URI: {baseTokenURI}</a></Alert>)}
      </div>

      <hr className="border-white/20" />

      {uploadMethod == 'Existing' && (
        <div className="ml-3 flex-column">
          <p className="my-3 ml-5">
            Though Stargaze&apos;s sg721 contract allows for off-chain metadata
            storage, it is recommended to use a decentralized storage solution,
            such as IPFS. <br /> You may head over to{' '}
            <Anchor
              href="https://nft.storage"
              className="font-bold text-plumbus hover:underline"
            >
              NFT Storage
            </Anchor>{' '}
            and upload your assets & metadata manually to get a base URI for
            your collection.
          </p>
          <div>
            <label className="block mr-1 mb-1 ml-5 font-bold text-white dark:text-gray-300">
              Collection Cover Image
            </label>
            <input
              onChange={handleChangeImage}
              placeholder="ipfs://bafybeigi3bwpvyvsmnbj46ra4hyffcxdeaj6ntfk5jpic5mx27x6ih2qvq/images/1.png"
              className="py-2 px-1 mx-5 mt-2 mb-2 w-1/2 bg-white/10 rounded border-2 border-white/20 focus:ring
          focus:ring-plumbus-20
          form-input, placeholder:text-white/50,"
            />
          </div>
          <div>
            <label className="block mt-3 mr-1 mb-1 ml-5 font-bold text-white dark:text-gray-300">
              Base Token URI
            </label>
            <input
              onChange={handleChangeBaseTokenUri}
              placeholder="ipfs://..."
              className="py-2 px-1 mx-5 mt-2 mb-2 w-1/2 bg-white/10 rounded border-2 border-white/20 focus:ring
          focus:ring-plumbus-20
          form-input, placeholder:text-white/50,"
            />
          </div>
        </div>
      )}
      {uploadMethod == 'New' && (
      <div>
        <div className="justify-items-start mt-5 mb-3 ml-3 flex-column">
        <div className="mt-3 ml-4 form-check form-check-inline">
          <input
            className="float-none mr-2 mb-1 w-4 h-4 align-middle bg-white checked:bg-stargaze bg-center bg-no-repeat bg-contain rounded-full border border-gray-300 checked:border-white focus:outline-none transition duration-200 appearance-none cursor-pointer form-check-input"
            type="radio"
            name="inlineRadioOptions3"
            id="inlineRadio3"
            value= {serviceType.NFT_Storage}
            onClick={() => {
              setUploadService(serviceType.NFT_Storage)
            }}
            onChange={() => { }}
            checked={uploadService === serviceType.NFT_Storage}
          />
          <label
            className="inline-block text-white cursor-pointer form-check-label"
            htmlFor="inlineRadio3"
          >
            Upload using NFT.Storage
          </label>
        </div>
        
        <div className="mt-3 ml-4 form-check form-check-inline">
          <input
            className="float-none mr-2 mb-1 w-4 h-4 align-middle bg-white checked:bg-stargaze bg-center bg-no-repeat bg-contain rounded-full border border-gray-300 checked:border-white focus:outline-none transition duration-200 appearance-none cursor-pointer form-check-input"
            type="radio"
            name="inlineRadioOptions4"
            id="inlineRadio4"
            value={serviceType.Pinata}
            onClick={() => {
              setUploadService(serviceType.Pinata)
            }}
            onChange={() => { }}
            checked={uploadService === serviceType.Pinata}
          />
          <label
            className="inline-block text-white cursor-pointer form-check-label"
            htmlFor="inlineRadio4"
          >
            Upload using Pinata
          </label>
        </div>
        </div>
        
        <div className="ml-8 flex flex-col w-1/2" >
          <Conditional test={uploadService === serviceType.NFT_Storage}>
            <label>NFT.Storage API Key</label>
            <StyledInput id={'nft_storage_api_key'} value={nftStorageApiKey} onChange={(e)=> setNftStorageApiKey(e.target.value)}></StyledInput>
          </Conditional>
        </div>
        <div className="ml-8 flex flex-col w-1/2" >
          <Conditional test={uploadService === serviceType.Pinata}>
            <label>Pinata API Key</label>
            <StyledInput className="w-1/2 mb-2 flex" id={'pinata_api_key'} value={pinataApiKey} onChange={(e)=> setPinataApiKey(e.target.value)}></StyledInput>
            <label>Pinata Secret Key</label>
            <StyledInput className="flex" id={'pinata_secret_key'} value={pinataSecretKey} onChange={(e)=> setPinataSecretKey(e.target.value)}></StyledInput>
          </Conditional>
        </div>  
      
       <div>
          <div className= "grid grid-cols-2">
            <div className='w-full'>
              <label className="block mt-5 mr-1 mb-1 ml-8 w-full font-bold text-white dark:text-gray-300">
                Image File Selection
              </label>
              <div
                className={clsx(
                  'flex relative justify-center items-center mx-8 mt-2 space-y-4 w-full h-32',
                  'rounded border-2 border-white/20 border-dashed'
                )}
              >
                <input
                  id="imageFiles"
                  accept="image/*"
                  className={clsx(
                    'file:py-2 file:px-4 file:mr-4 file:bg-plumbus-light file:rounded file:border-0 cursor-pointer',
                    'before:absolute before:inset-0 before:hover:bg-white/5 before:transition'
                  )}
                  onChange={selectImages}
                  ref={imageFilesRef}
                  type="file"
                  multiple
                />
              </div>

              <label className="block mt-5 mr-1 mb-1 ml-8 w-full font-bold text-white dark:text-gray-300">
                Metadata Selection
              </label>
              <div
                className={clsx(
                  'flex relative justify-center items-center mx-8 mt-2 space-y-4 w-full h-32',
                  'rounded border-2 border-white/20 border-dashed'
                )}
              >
                <input
                  id="metadataFiles"
                  accept=""
                  className={clsx(
                    'file:py-2 file:px-4 file:mr-4 file:bg-plumbus-light file:rounded file:border-0 cursor-pointer',
                    'before:absolute before:inset-0 before:hover:bg-white/5 before:transition'
                  )}
                  onChange={selectMetadata}
                  ref={metadataFilesRef}
                  type="file"
                  multiple
                />
              </div>

              <div className="mt-5 ml-8">
                <Button
                  onClick={updateMetadata}
                  variant="solid"
                  isWide
                  className="w-[120px]"
                >
                  Upload
                </Button>
              </div>
              <MetadataModal updateMetadata={updateMetadataFileArray} metadataFile={metadataFilesArray[metadataFileArrayIndex]} updatedMetadataFile ={updatedMetadataFilesArray[metadataFileArrayIndex]} refresher={refreshMetadata}></MetadataModal>
          </div>
      
          <div className="ml-20 mr-10 mt-2 w-4/5 h-96 carousel carousel-vertical rounded-box border-dashed border-2">
            {imageFilesArray.length > 0 && (imageFilesArray.map((imageSource, index) => (
              <div className="carousel-item w-full h-1/8">
                <div className='grid grid-cols-4 col-auto'>
                <Conditional test={imageFilesArray[4*index] !== null}>
                <button key={4*index} onClick={()=>{updateMetadataFileIndex(4*index)}} className="p-0 w-full h-full relative btn modal-button bg-transparent border-0 hover:bg-transparent">
                  <label htmlFor="my-modal-4" className="p-0 w-full h-full relative btn modal-button bg-transparent border-0 hover:bg-transparent">
                    <img key={4*index} className="my-1 px-1 thumbnail" src={imageFilesArray[4*index] ? URL.createObjectURL(imageFilesArray[4*index]):""} />
                  </label> 
                </button>
                </Conditional>
                <Conditional test={imageFilesArray.length > 4*index+1}>
                <button key={4*index+1} onClick={()=> {updateMetadataFileIndex(4*index+1)}} className="p-0 w-full h-full relative btn modal-button bg-transparent border-0 hover:bg-transparent">
                  <label htmlFor="my-modal-4" className="p-0 w-full h-full relative btn modal-button bg-transparent border-0 hover:bg-transparent">
                    <img key={4*index+1} className="my-1 px-1 thumbnail" src={imageFilesArray[4*index+1] ? URL.createObjectURL(imageFilesArray[4*index+1]):""} />
                  </label>
                </button>
                </Conditional>
                <Conditional test={imageFilesArray.length > 4*index+2}>
                <button key={4*index+2} onClick={()=> {updateMetadataFileIndex(4*index+2)}} className="p-0 w-full h-full relative btn modal-button bg-transparent border-0 hover:bg-transparent">
                  <label htmlFor="my-modal-4" className="p-0 w-full h-full relative btn modal-button bg-transparent border-0 hover:bg-transparent">
                    <img key={4*index+2} className="my-1 px-1 thumbnail" src={imageFilesArray[4*index+2] ? URL.createObjectURL(imageFilesArray[4*index+2]):""} />
                  </label>
                </button>
                </Conditional>
                <Conditional test={imageFilesArray.length > 4*index+3}>
                <button key={4*index+3} onClick={()=> {updateMetadataFileIndex(4*index+3)}} className="p-0 w-full h-full relative btn modal-button bg-transparent border-0 hover:bg-transparent">
                  <label htmlFor="my-modal-4" className="p-0 w-full h-full relative btn modal-button bg-transparent border-0 hover:bg-transparent">
                    <img key={4*index+3} className="my-1 px-1 thumbnail" src={imageFilesArray[4*index+3] ? URL.createObjectURL(imageFilesArray[4*index+3]):""} />
                  </label>
                </button>
                </Conditional>
              </div>
            </div> )))}
          </div>
          </div> 
          
        </div>
      </div>
      )}
    </div>
  )
}

export default withMetadata(UploadPage, { center: false })
