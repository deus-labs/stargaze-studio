import { FormControl } from 'components/FormControl'
import { FormGroup } from 'components/FormGroup'
import { useNumberInputState } from 'components/forms/FormInput.hooks'
import { InputDateTime } from 'components/InputDateTime'
import React, { useState } from 'react'

import { Conditional } from './Conditional'
import { NumberInput } from './forms/FormInput'
import { JsonPreview } from './JsonPreview'
import { WhitelistUpload } from './WhitelistUpload'

export const WhitelistDetails = () => {
  const [wlstartDate, setwlStartDate] = useState<Date | undefined>(undefined)
  const [wlendDate, setwlEndDate] = useState<Date | undefined>(undefined)
  const [whitelistArray, setWhitelistArray] = useState<string[]>([])

  const wlunitPriceState = useNumberInputState({
    id: 'unit-price',
    name: 'unitPrice',
    title: 'Unit Price',
    subtitle: 'Price of each tokens in collection',
    placeholder: '500',
  })

  const wlmemberLimitState = useNumberInputState({
    id: 'member-limit',
    name: 'memberLimit',
    title: 'Member Limit',
    subtitle: 'Limit of the whitelisted members',
    placeholder: '1000',
  })

  const wlperAddressLimitState = useNumberInputState({
    id: 'per-address-limit',
    name: 'perAddressLimit',
    title: 'Per Address Limit',
    subtitle: 'Limit of tokens per address',
    placeholder: '5',
  })

  const whitelistFileOnChange = (data: string[]) => {
    setWhitelistArray(data)
  }

  return (
    <div className="grid grid-cols-2">
      <FormGroup subtitle="Information about your minting settings" title="Whitelist Minting Details">
        <NumberInput isRequired {...wlunitPriceState} />
        <NumberInput isRequired {...wlmemberLimitState} />
        <NumberInput isRequired {...wlperAddressLimitState} />
      </FormGroup>
      <FormGroup subtitle="" title="">
        <FormControl htmlId="start-date" isRequired subtitle="Start time for the minting" title="Start Time">
          <InputDateTime minDate={new Date()} onChange={(date) => setwlStartDate(date)} value={wlstartDate} />
        </FormControl>
        <FormControl htmlId="end-date" isRequired subtitle="End time for the minting" title="End Time">
          <InputDateTime minDate={new Date()} onChange={(date) => setwlEndDate(date)} value={wlendDate} />
        </FormControl>
        <WhitelistUpload onChange={whitelistFileOnChange} />
        <Conditional test={whitelistArray.length > 0}>
          <JsonPreview content={whitelistArray} initialState={false} title="File Contents" />
        </Conditional>
      </FormGroup>
    </div>
  )
}
