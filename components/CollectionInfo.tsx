import { Button } from 'components/Button'
import { Conditional } from 'components/Conditional'
import { FormControl } from 'components/FormControl'
import { FormGroup } from 'components/FormGroup'
import { useInputState, useNumberInputState } from 'components/forms/FormInput.hooks'
import { InputDateTime } from 'components/InputDateTime'
import React, { useState } from 'react'
import useCollapse from 'react-collapsed'
import { useMutation } from 'react-query'

import { NumberInput, TextInput } from './forms/FormInput'

export const CollectionInfo = () => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  const [timestamp, setTimestamp] = useState<Date | undefined>()

  const nameState = useInputState({
    id: 'name',
    name: 'name',
    title: 'Name',
    subtitle: '',
  })

  const descriptionState = useInputState({
    id: 'description',
    name: 'description',
    title: 'Description',
    subtitle: '',
  })

  const imageState = useInputState({
    id: 'image',
    name: 'image',
    title: 'Image',
    subtitle: '',
  })

  const externalImageState = useInputState({
    id: 'externalImage',
    name: 'externalImage',
    title: 'External Image',
    subtitle: '',
  })

  const numberOfTokensState = useNumberInputState({
    id: 'numberoftokens',
    name: 'numberoftokens',
    title: 'Number Of Tokens',
    subtitle: '',
    placeholder: '100',
  })

  const unitPriceState = useNumberInputState({
    id: 'unitPrice',
    name: 'unitPrice',
    title: 'Unit Price',
    subtitle: '',
    placeholder: '100',
  })

  const perAddressLimitState = useNumberInputState({
    id: 'peraddresslimit',
    name: 'peraddresslimit',
    title: 'Per Address Limit',
    subtitle: '',
    placeholder: '1',
  })

  const { isLoading, mutate } = useMutation(
    (event: FormEvent) => {
      //event.preventDefault()
    },
    {
      onError: (error) => {
        //toast.error(String(error))
      },
    },
  )

  return (
    <div>
      <form className="grid grid-cols-2 p-4 space-x-8" onSubmit={mutate}>
        <div className="space-y-8">
          <FormGroup subtitle="Information about your collection" title="Collection Info">
            <TextInput {...nameState} />
            <TextInput {...descriptionState} />
            <TextInput {...imageState} />
            <TextInput {...externalImageState} />
          </FormGroup>
          <FormGroup subtitle="Information about your minting settings" title="Minting Details">
            <NumberInput {...numberOfTokensState} />
            <NumberInput {...unitPriceState} />
            <NumberInput {...perAddressLimitState} />
            <FormControl htmlId="timestamp" isRequired subtitle="Start time for the minting" title="Start Time">
              <InputDateTime minDate={new Date()} onChange={(date) => setTimestamp(date)} value={timestamp} />
            </FormControl>
          </FormGroup>
          <button {...getToggleProps()}>Advanced</button>
          <section {...getCollapseProps()}>
            <FormGroup subtitle="Information about your minting settings" title="White List">
              <Conditional test>
                <TextInput {...nameState} />
              </Conditional>
            </FormGroup>
            <FormGroup subtitle="Information about your minting settings" title="Loyality">
              <Conditional test>
                <TextInput {...nameState} />
              </Conditional>
            </FormGroup>
          </section>
        </div>
        <div className="space-y-8">
          <div className="relative">
            <Button className="absolute top-0 right-0" isLoading={isLoading} type="submit">
              Upload
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
