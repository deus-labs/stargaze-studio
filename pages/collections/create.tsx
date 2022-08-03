import Anchor from 'components/Anchor'
import Button from 'components/Button'
import {
  CollectionDetails,
  MintingDetails,
  RoyaltyDetails,
  UploadDetails,
  WhitelistDetails,
} from 'components/collections/creation'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import useCollapse from 'react-collapsed'
import { withMetadata } from 'utils/layout'
import { links } from 'utils/links'

const UploadPage: NextPage = () => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  const toggleProps = getToggleProps()
  const collapseProps = getCollapseProps()

  const createCollection = () => {
    console.log('create collection')
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
        <CollectionDetails />
        <MintingDetails />
      </div>

      <div className="flex justify-end">
        <Button {...toggleProps} isWide type="button" variant="outline">
          {isExpanded ? 'Hide' : 'Show'} Advanced Details
        </Button>
      </div>

      <section {...collapseProps}>
        <WhitelistDetails />
        <RoyaltyDetails />
      </section>

      <div className="mt-5 ml-8">
        <Button className="mb-8" isWide onClick={createCollection} variant="solid">
          Upload
        </Button>
      </div>
    </div>
  )
}

export default withMetadata(UploadPage, { center: false })
