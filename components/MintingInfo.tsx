import FormControl from 'components/FormControl'
import Input from 'components/Input'
import { setNumTokens, setPerAddressLimit, setStartTime, setUnitPrice } from 'contexts/collection'
import React, { useEffect, useState } from 'react'

export const MintingInfo = () => {
  const handleChangeUnitPrice = (event: { target: { value: React.SetStateAction<string> } }) => {
    setUnitPrice(Number(event.target.value))
  }

  const handleChangeNumTokens = (event: { target: { value: React.SetStateAction<string> } }) => {
    setNumTokens(Number(event.target.value))
  }

  const handleChangePerAddressLimit = (event: { target: { value: React.SetStateAction<string> } }) => {
    setPerAddressLimit(Number(event.target.value))
  }

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  function getExecutionTimeInNanosecs(): number {
    const yearMonthDay = date.split('-')
    return (
      new Date(
        `${Number(yearMonthDay[1]).toString()}-${Number(yearMonthDay[2]).toString()}-${Number(
          yearMonthDay[0],
        ).toString()}-${time}`,
      ).getTime() * 1000000
    )
  }

  const handleChangeDate = (event: { target: { value: React.SetStateAction<string> } }) => {
    setDate(event.target.value)
  }

  const handleChangeTime = (event: { target: { value: React.SetStateAction<string> } }) => {
    setTime(event.target.value)
  }

  useEffect(() => {
    setStartTime(getExecutionTimeInNanosecs().toString())
  }, [date, time])

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <FormControl
        htmlId="airdrop-name"
        subtitle="This is how people will find you in the list of airdrops."
        title="Name"
      >
        <Input id="airdrop-name" name="name" placeholder="My Awesome Airdrop" type="text" value="{projectName}" />
      </FormControl>
      <label className="block mt-3 mb-1 w-2/3 font-bold text-white dark:text-gray-300" htmlFor="numberoftokens">
        Number of Tokens
      </label>
      <input
        className="py-2 px-1 mt-2 mb-2 w-2/3 bg-white/10 rounded border-2 border-white/20 focus:ring
            focus:ring-plumbus-20
            form-input, placeholder:text-white/50,"
        id="numberoftokens"
        onChange={handleChangeNumTokens}
        placeholder="100"
        type="number"
      />
      <label className="block mt-3 mb-1 w-2/3 font-bold text-white dark:text-gray-300" htmlFor="unitprice">
        Unit Price
      </label>
      <input
        className="py-2 px-1 mt-2 mb-2 w-2/3 bg-white/10 rounded border-2 border-white/20 focus:ring
            focus:ring-plumbus-20
            form-input, placeholder:text-white/50,"
        id="unitprice"
        onChange={handleChangeUnitPrice}
        placeholder="100"
        type="number"
      />
      <label className="block mt-3 mb-1 w-2/3 font-bold text-white dark:text-gray-300" htmlFor="peraddresslimit">
        Per Address Limit
      </label>
      <input
        className="py-2 px-1 mt-2 mb-2 w-2/3 bg-white/10 rounded border-2 border-white/20 focus:ring
            focus:ring-plumbus-20
            form-input, placeholder:text-white/50,"
        id="peraddresslimit"
        onChange={handleChangePerAddressLimit}
        placeholder="1"
        type="number"
      />
      <label className="block mt-3 mr-1 mb-1 w-2/3 font-bold text-white dark:text-gray-300" htmlFor="starttime">
        Start Time
      </label>
      <div className="mt-3 w-2/3">
        <input
          className="py-2 px-1 mt-2 mr-2 mb-2 w-[48%] bg-white/10 rounded border-2 border-white/20 focus:ring
        focus:ring-plumbus-20
        form-input, placeholder:text-white/50,"
          id="starttime"
          onChange={handleChangeDate}
          type="date"
        />
        <input
          className="py-2 px-1 mt-2 mb-2 w-[48%] bg-white/10 rounded border-2 border-white/20 focus:ring
        focus:ring-plumbus-20
        form-input, placeholder:text-white/50,"
          onChange={handleChangeTime}
          type="time"
        />
      </div>
    </div>
  )
}
