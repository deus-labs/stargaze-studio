import { ProtoSignDocDecoder } from "@keplr-wallet/cosmos";
import { FormGroup } from "./FormGroup";
import { TextInput } from "./forms/FormInput";
import { useInputState } from "./forms/FormInput.hooks";
import { MetadataAttributes, Attribute } from './forms/MetadataAttributes';
import { useMetadataAttributesState } from 'components/forms/MetadataAttributes.hooks'
import { useState, useEffect, ChangeEvent } from 'react';
import { uid } from '../utils/random';
import Button from "./Button";



export interface MetadataModalProps{
    metadataFile: File;
    updateMetadata: (metadataFile: File) => void;
    updatedMetadataFile: File;
    refresher: boolean;
}

export const MetadataModal = (props: MetadataModalProps) => {
    const metadataFile: File = props.metadataFile;
    const updatedMetadataFile: File = props.updatedMetadataFile;
    const [metadata, setMetadata] = useState<any>(null);
    const [imageURL, setImageURL] = useState<string>("");
    
    let parsedMetadata: any; 
    const parseMetadata = async () => {
        if(metadataFile){                
            attributesState.reset()
            parsedMetadata = JSON.parse(await metadataFile.text())

            for(let i = 0; i < parsedMetadata.attributes.length; i++){
                attributesState.add({trait_type: parsedMetadata.attributes[i].trait_type, value: parsedMetadata.attributes[i].value})      
            }
            nameState.onChange(parsedMetadata.name)
            descriptionState.onChange(parsedMetadata.description)
            externalUrlState.onChange(parsedMetadata.external_url)

            setMetadata(parsedMetadata)
        }
        if(updatedMetadataFile){
          let updatedMetadata = JSON.parse(await updatedMetadataFile.text())
          setImageURL(updatedMetadata.image)
        }

    }

    const nameState = useInputState({
      id: 'name',
      name: 'name',
      title: 'Name',
      placeholder: 'Token name',
      defaultValue: metadata?.name
    })
    
    const descriptionState = useInputState({
      id: 'description',
      name: 'description',
      title: 'Description',
      placeholder: 'Token description',
      defaultValue: metadata?.description,
    })

    const externalUrlState = useInputState({
      id: 'externalUrl',
      name: 'externalUrl',
      title: 'External URL',
      placeholder: 'https://',
      defaultValue: metadata?.external_url
    })

    const imageState = useInputState({
      id: 'image',
      name: 'image',
      title: 'Image',
      placeholder: 'ipfs://',
      defaultValue: imageURL
    })

    const attributesState = useMetadataAttributesState()

    const generateUpdatedMetadata = async () => {
        console.log("Current Parsed Data: " + parsedMetadata)
        console.log("Updating...")
        
        metadata.attributes = Object.values(attributesState)[1]
        metadata.attributes = metadata.attributes.filter((attribute: { trait_type: string; }) => attribute.trait_type !== '')

        metadata.name = nameState.value
        metadata.description = descriptionState.value
        metadata.external_url = externalUrlState.value
        
        let metadataFileBlob = new Blob([JSON.stringify(metadata)], {
          type: 'application/json',
        })

        let updatedMetadataFile = new File(
          [metadataFileBlob],
          metadataFile.name,
          { type: 'application/json' }
        )
        props.updateMetadata(updatedMetadataFile)
    }
       
    useEffect(() => {
        parseMetadata();
    }, [props.metadataFile, props.refresher])
    
    return (
        <div>
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box max-w-5xl max-h-full absolute top-5 bottom-5 w-full" htmlFor="">
            <FormGroup subtitle="" title="Metadata">
                <TextInput {...nameState} onChange={(e)=>nameState.onChange(e.target.value)}/>
                <TextInput {...descriptionState} onChange={(e)=>descriptionState.onChange(e.target.value) } />
                <TextInput {...externalUrlState} onChange={(e)=>externalUrlState.onChange(e.target.value) } />
                <TextInput {...imageState} disabled value={imageURL} />
                <MetadataAttributes
                attributes={attributesState.entries}
                onAdd={attributesState.add}
                onChange={attributesState.update}
                onRemove={attributesState.remove}
                subtitle="Enter trait types and values"
                title="Attributes"
                />
                <Button onClick={generateUpdatedMetadata}>Update Metadata</Button>
            </FormGroup>
            
            </label>
          </label>
        </div>
    )

}

