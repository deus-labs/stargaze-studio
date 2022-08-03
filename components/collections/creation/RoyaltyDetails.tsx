import { FormGroup } from 'components/FormGroup'
import { useInputState, useNumberInputState } from 'components/forms/FormInput.hooks'
import React from 'react'

import { NumberInput, TextInput } from '../../forms/FormInput'

export const RoyaltyDetails = () => {
  const royaltyPaymentAddressState = useInputState({
    id: 'royalty-payment-address',
    name: 'royaltyPaymentAddress',
    title: 'Payment Address',
    subtitle: 'Address to receive royalties',
    placeholder: 'stars1234567890abcdefghijklmnopqrstuvwxyz...',
  })

  const royaltyShareState = useNumberInputState({
    id: 'royalty-share',
    name: 'royaltyShare',
    title: 'Share Percentage',
    subtitle: 'Percentage of royalties to be paid',
    placeholder: '8',
  })

  return (
    <div>
      <FormGroup subtitle="Information about royalty" title="Royalty Details">
        <TextInput {...royaltyPaymentAddressState} />
        <NumberInput {...royaltyShareState} />
      </FormGroup>
    </div>
  )
}
