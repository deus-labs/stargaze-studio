import { FormControl } from 'components/FormControl'
import { FormGroup } from 'components/FormGroup'
import { useNumberInputState } from 'components/forms/FormInput.hooks'
import { InputDateTime } from 'components/InputDateTime'
import React, { useEffect, useState } from 'react'

import { NumberInput } from '../../forms/FormInput'

interface MintingDetailsProps {
  onChange: (data: MintingDetailsDataProps) => void
}

export interface MintingDetailsDataProps {
  num_tokens: number
  unit_price: string
  per_address_limit: number
  start_time: string
}

export const MintingDetails = ({ onChange }: MintingDetailsProps) => {
  const [timestamp, setTimestamp] = useState<Date | undefined>()

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

  useEffect(() => {
    const data: MintingDetailsDataProps = {
      num_tokens: numberOfTokensState.value,
      unit_price: unitPriceState.value ? (Number(unitPriceState.value) * 1_000_000).toString() : '',
      per_address_limit: perAddressLimitState.value,
      start_time: timestamp ? (timestamp.getTime() * 1_000_000).toString() : '',
    }

    onChange(data)
  }, [numberOfTokensState.value, unitPriceState.value, perAddressLimitState.value])

  return (
    <div>
      <FormGroup subtitle="Information about your minting settings" title="Minting Details">
        <NumberInput {...numberOfTokensState} />
        <NumberInput {...unitPriceState} />
        <NumberInput {...perAddressLimitState} />
        <FormControl htmlId="timestamp" isRequired subtitle="Start time for the minting" title="Start Time">
          <InputDateTime minDate={new Date()} onChange={(date) => setTimestamp(date)} value={timestamp} />
        </FormControl>
      </FormGroup>
    </div>
  )
}
