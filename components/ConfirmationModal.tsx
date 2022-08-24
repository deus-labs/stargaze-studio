import { Alert } from './Alert'
import { Button } from './Button'

export interface ConfirmationModalProps {
  confirm: () => void
}
export const ConfirmationModal = (props: ConfirmationModalProps) => {
  return (
    <div>
      <input className="modal-toggle" id="my-modal-2" type="checkbox" />
      <label className="cursor-pointer modal" htmlFor="my-modal-2">
        <label
          className="absolute top-[40%] bottom-5 left-1/3 max-w-3xl max-h-40 border-2 no-scrollbar modal-box"
          htmlFor="temp"
        >
          <Alert type="warning">
            Are you sure to create a collection with the specified assets, metadata and parameters?
          </Alert>
          <Button className="absolute top-[65%] mb-4 max-h-12" isDisabled={false} onClick={() => props.confirm()}>
            <label
              className="relative p-0 w-full h-full bg-transparent hover:bg-transparent border-0 btn modal-button"
              htmlFor="my-modal-2"
            >
              Confirm
            </label>
          </Button>
        </label>
      </label>
    </div>
  )
}
