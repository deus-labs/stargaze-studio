/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import Anchor from 'components/Anchor'
import Button from 'components/Button'
import {
  CollectionDetails,
  MintingDetails,
  RoyaltyDetails,
  UploadDetails,
  WhitelistDetails,
} from 'components/collections/creation'
import type { CollectionDetailsDataProps } from 'components/collections/creation/CollectionDetails'
import type { MintingDetailsDataProps } from 'components/collections/creation/MintingDetails'
import type { WhitelistDetailsDataProps } from 'components/collections/creation/WhitelistDetails'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import useCollapse from 'react-collapsed'
import { toast } from 'react-hot-toast'
import { withMetadata } from 'utils/layout'
import { links } from 'utils/links'

const UploadPage: NextPage = () => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  const toggleProps = getToggleProps()
  const collapseProps = getCollapseProps()

  const [collectionDetails, setCollectionDetails] = useState<CollectionDetailsDataProps | null>(null)
  const [mintingDetails, setMintingDetails] = useState<MintingDetailsDataProps | null>(null)
  const [whitelistDetails, setWhitelistDetails] = useState<WhitelistDetailsDataProps | null>(null)

  const createCollection = () => {
    try {
      checkCollectionDetails()
      checkMintingDetails()
      checkWhitelistDetails()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const checkCollectionDetails = () => {
    if (!collectionDetails) throw new Error('Please fill out the collection details')
    if (collectionDetails.name === '') throw new Error('Name is required')
    if (collectionDetails.description === '') throw new Error('Description is required')
    if (collectionDetails.imageFile === null) throw new Error('Cover Image is required')
  }

  const checkMintingDetails = () => {
    if (!mintingDetails) throw new Error('Please fill out the minting details')
    if (mintingDetails.num_tokens === 0) throw new Error('Number of tokens is required')
    if (mintingDetails.unit_price === '') throw new Error('Price is required')
    if (mintingDetails.per_address_limit === 0) throw new Error('Per address limit is required')
    if (mintingDetails.start_time === '') throw new Error('Start time is required')
  }

  const checkWhitelistDetails = () => {
    if (!whitelistDetails) throw new Error('Please fill out the whitelist details')
    if (whitelistDetails.isContractAddress) {
      if (whitelistDetails.contractAddress === '') throw new Error('Contract address is required')
    } else {
      if (whitelistDetails.members?.length === 0) throw new Error('Whitelist member list cannot be empty')
      if (whitelistDetails.unit_price === '') throw new Error('Whitelist unit price is required')
      if (whitelistDetails.start_time === '') throw new Error('Start time is required')
      if (whitelistDetails.end_time === '') throw new Error('End time is required')
      if (whitelistDetails.per_address_limit === 0) throw new Error('Per address limit is required')
      if (whitelistDetails.member_limit === 0) throw new Error('Member limit is required')
    }
  }

  return (
    <div>
      <NextSeo title="Create Collection" />

      <div className="mt-5 space-y-8 text-center">
        <h1 className="font-heading text-4xl font-bold">Upload Assets & Metadata</h1>

        <p>
          Make sure you check our{' '}
          <Anchor className="font-bold text-plumbus hover:underline" href={links['Docs']}>
            documentation
          </Anchor>{' '}
          on how to create your collection
        </p>
      </div>

      <hr className="border-white/20" />

      <UploadDetails />

      <div className="flex justify-evenly grid-col-2">
        <CollectionDetails onChange={setCollectionDetails} />
        <MintingDetails onChange={setMintingDetails} />
      </div>

      <div className="flex justify-end">
        <Button {...toggleProps} isWide type="button" variant="outline">
          {isExpanded ? 'Hide' : 'Show'} Advanced Details
        </Button>
      </div>

      <section {...collapseProps}>
        <WhitelistDetails onChange={setWhitelistDetails} />
        <RoyaltyDetails />
      </section>

      <div className="mt-5 ml-8">
        <Button className="mb-8" isWide onClick={createCollection} variant="solid">
          Create Collection
        </Button>
      </div>
    </div>
  )
}

export default withMetadata(UploadPage, { center: false })
