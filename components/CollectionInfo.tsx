import { setDescription, setExternalImage, setImage, setName } from 'contexts/collection'
import React from 'react'

export const CollectionInfo = () => {
  const handleChangeName = (event: { target: { value: React.SetStateAction<string> } }) => {
    setName(event.target.value.toString())
  }

  const handleChangeDescripion = (event: { target: { value: React.SetStateAction<string> } }) => {
    setDescription(event.target.value.toString())
  }

  const handleChangeImage = (event: { target: { value: React.SetStateAction<string> } }) => {
    setImage(event.target.value.toString())
  }

  const handleChangeExternalImage = (event: { target: { value: React.SetStateAction<string> } }) => {
    setExternalImage(event.target.value.toString())
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <label className="block mt-3 mb-1 w-2/3 font-bold text-white dark:text-gray-300" htmlFor="name">
        Name
      </label>
      <input
        className="py-2 px-1 w-2/3 bg-white/10 rounded border-2 border-white/20 focus:ring
          focus:ring-plumbus-20
          form-input, placeholder:text-white/50,"
        id="name"
        onChange={handleChangeName}
        placeholder="Collection Name"
      />
      <label className="block mt-3 mb-1 w-2/3 font-bold text-white dark:text-gray-300" htmlFor="description">
        Description
      </label>
      <input
        className="py-2 px-1 mt-2 mb-2 w-2/3 bg-white/10 rounded border-2 border-white/20 focus:ring
        focus:ring-plumbus-20
        form-input, placeholder:text-white/50,"
        id="description"
        onChange={handleChangeDescripion}
        placeholder="An awesome NFT series"
      />
      <label className="block mt-3 mb-1 w-2/3 font-bold text-white dark:text-gray-300" htmlFor="image">
        Image
      </label>
      <input
        className="py-2 px-1 mt-2 mb-2 w-2/3 bg-white/10 rounded border-2 border-white/20 focus:ring
        focus:ring-plumbus-20
        form-input, placeholder:text-white/50,"
        id="image"
        onChange={handleChangeImage}
        placeholder=""
      />
      <label className="block mt-3 mb-1 w-2/3 font-bold text-white dark:text-gray-300" htmlFor="externalimage">
        External Image
      </label>
      <input
        className="py-2 px-1 mt-2 mb-2 w-2/3 bg-white/10 rounded border-2 border-white/20 focus:ring
        focus:ring-plumbus-20
        form-input, placeholder:text-white/50,"
        id="externalimage"
        onChange={handleChangeExternalImage}
        placeholder=""
      />
    </div>
  )
}
