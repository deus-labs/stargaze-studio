import { FormControl } from 'components/FormControl'
import { FormGroup } from 'components/FormGroup'
import { useNumberInputState } from 'components/forms/FormInput.hooks'
import { InputDateTime } from 'components/InputDateTime'
import React, { useState } from 'react'

import { NumberInput } from '../../forms/FormInput'

export const MintingDetails = () => {
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
