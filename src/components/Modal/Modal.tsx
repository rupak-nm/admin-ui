import { ReactNode, useEffect } from 'react'

import { Icon } from '@/elements/Icon'
import * as Dialog from '@radix-ui/react-dialog'

interface Props {
  showCloseButton?: boolean, 
  children: ReactNode | string, 
  visible?: boolean, 
  setVisible?: (_open: boolean) => any, 
  title?: ReactNode | string, 
  description?: ReactNode | string, 
  trigger?: ReactNode, 
  className?: string, 
  disableChildrenAsChild?: boolean, 
  noOverlay?: boolean
}

const Modal = (props: Props) => {
  const { showCloseButton, children, visible, setVisible, title, description, trigger, className, disableChildrenAsChild, noOverlay } = props

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [visible])

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  return (
    <Dialog.Root open={visible} onOpenChange={setVisible} modal={false}>
      {disableChildrenAsChild && (
        <>
          {trigger}
        </>
      )}
      {!disableChildrenAsChild && (
        <Dialog.Trigger asChild={!disableChildrenAsChild}>
          {trigger}
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        {!noOverlay && (
          <div className='DialogOverlay' />
        )}
        <Dialog.Content className={'DialogContent' + (className ? ' ' + className : '')}>
          {title && (
            <div className='titlebar'>
              <Dialog.Title className='DialogTitle'>
                <div className='title'>
                  {title}
                </div>
              </Dialog.Title>
              {showCloseButton && (
                <Dialog.Close asChild>
                  <button className='IconButton' aria-label='Close'>
                    <Icon variant='x' size='xl' />
                  </button>
                </Dialog.Close>
              )}
            </div>
          )}
          {description && (
            <Dialog.Description className='DialogDescription'>
              {description}
            </Dialog.Description>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { Modal }
