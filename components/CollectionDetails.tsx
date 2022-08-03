import clsx from 'clsx'
import { FormControl } from 'components/FormControl'
import { FormGroup } from 'components/FormGroup'
import { useInputState } from 'components/forms/FormInput.hooks'
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

import { TextInput } from './forms/FormInput'

export const CollectionDetails = () => {
  const [coverImage, setCoverImage] = useState<File | null>(null)

  const nameState = useInputState({
    id: 'name',
    name: 'name',
    title: 'Name',
    placeholder: 'My Awesome Collection',
  })

  const descriptionState = useInputState({
    id: 'description',
    name: 'description',
    title: 'Description',
    placeholder: 'My Awesome Collection Description',
  })

  const externalImageState = useInputState({
    id: 'externalImage',
    name: 'externalImage',
    title: 'External Image',
    placeholder: 'https://my-collection...',
  })

  const selectCoverImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return toast.error('Error selecting cover image')
    if (event.target.files.length === 0) {
      setCoverImage(null)
      return toast.error('No files selected.')
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      if (!e.target?.result) return toast.error('Error parsing file.')
      if (!event.target.files) return toast.error('No files selected.')
      const imageFile = new File([e.target.result], event.target.files[0].name, { type: 'image/jpg' })
      setCoverImage(imageFile)
    }
    reader.readAsArrayBuffer(event.target.files[0])
  }

  return (
    <div>
      <FormGroup subtitle="Information about your collection" title="Collection Details">
        <TextInput {...nameState} isRequired />
        <TextInput {...descriptionState} isRequired />
        <FormControl isRequired title="Cover Image">
          <input
            accept="image/*"
            className={clsx(
              'file:py-2 file:px-4 file:mr-4 file:bg-plumbus-light file:rounded file:border-0 cursor-pointer',
              'before:hover:bg-white/5 before:transition',
            )}
            id="cover-image"
            onChange={selectCoverImage}
            type="file"
          />
          {coverImage !== null && (
            <div className="w-[200px] h-[200px] rounded border-2">
              <img alt="cover-preview" src={URL.createObjectURL(coverImage)} />
            </div>
          )}
        </FormControl>
        <TextInput {...externalImageState} />
      </FormGroup>
    </div>
  )
}
