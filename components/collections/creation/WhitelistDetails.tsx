import { FormControl } from 'components/FormControl'
import { FormGroup } from 'components/FormGroup'
import { useNumberInputState } from 'components/forms/FormInput.hooks'
import { InputDateTime } from 'components/InputDateTime'
import React, { useEffect, useState } from 'react'

import { Conditional } from '../../Conditional'
import { NumberInput } from '../../forms/FormInput'
import { JsonPreview } from '../../JsonPreview'
import { WhitelistUpload } from '../../WhitelistUpload'

interface WhitelistDetailsProps {
  onChange: (data: WhitelistDetailsDataProps) => void
}

export interface WhitelistDetailsDataProps {
  isContractAddress: boolean
  contractAddress?: string
  members?: string[]
  unit_price?: string
  start_time?: string
  end_time?: string
  per_address_limit?: number
  member_limit?: number
}

export const WhitelistDetails = ({ onChange }: WhitelistDetailsProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [whitelistArray, setWhitelistArray] = useState<string[]>([])

  const uniPriceState = useNumberInputState({
    id: 'unit-price',
    name: 'unitPrice',
    title: 'Unit Price',
    subtitle: 'Price of each tokens in collection',
    placeholder: '500',
  })

  const memberLimitState = useNumberInputState({
    id: 'member-limit',
    name: 'memberLimit',
    title: 'Member Limit',
    subtitle: 'Limit of the whitelisted members',
    placeholder: '1000',
  })

  const perAddressLimitState = useNumberInputState({
    id: 'per-address-limit',
    name: 'perAddressLimit',
    title: 'Per Address Limit',
    subtitle: 'Limit of tokens per address',
    placeholder: '5',
  })

  const whitelistFileOnChange = (data: string[]) => {
    setWhitelistArray(data)
  }

  useEffect(() => {
    const data: WhitelistDetailsDataProps = {
      isContractAddress: false,
      members: whitelistArray,
      unit_price: uniPriceState.value ? (Number(uniPriceState.value) * 1_000_000).toString() : '',
      start_time: startDate ? (startDate.getTime() * 1_000_000).toString() : '',
      end_time: endDate ? (endDate.getTime() * 1_000_000).toString() : '',
      per_address_limit: perAddressLimitState.value,
      member_limit: memberLimitState.value,
    }

    onChange(data)
  }, [uniPriceState.value, memberLimitState.value, perAddressLimitState.value, startDate, endDate, whitelistArray])

  return (
    <div className="grid grid-cols-2">
      <FormGroup subtitle="Information about your minting settings" title="Whitelist Minting Details">
        <NumberInput isRequired {...uniPriceState} />
        <NumberInput isRequired {...memberLimitState} />
        <NumberInput isRequired {...perAddressLimitState} />
      </FormGroup>
      <FormGroup subtitle="" title="">
        <FormControl htmlId="start-date" isRequired subtitle="Start time for the minting" title="Start Time">
          <InputDateTime minDate={new Date()} onChange={(date) => setStartDate(date)} value={startDate} />
        </FormControl>
        <FormControl htmlId="end-date" isRequired subtitle="End time for the minting" title="End Time">
          <InputDateTime minDate={new Date()} onChange={(date) => setEndDate(date)} value={endDate} />
        </FormControl>
        <WhitelistUpload onChange={whitelistFileOnChange} />
        <Conditional test={whitelistArray.length > 0}>
          <JsonPreview content={whitelistArray} initialState={false} title="File Contents" />
        </Conditional>
      </FormGroup>
    </div>
  )
}
