import { Modal } from "../Modal/Modal";


const ForceTxPopup = ({
  open,
  close,
  message,
  args,
  methodName,
  fn,
  successCb,
}: {
  open: boolean;
  close: () => void;
  message: string;
  args: string[];
  methodName: string;
  fn?: (_props: HookMethodArgs) => void;
  successCb?: () => void;
}) => {
  return (
    <Modal visible={open} setVisible={close} className='force tx'
      title={(
      <div className='title'>
        EVM Error Occurred While Processing Your Request
      </div>
      )}
    >

      <div className='desc'>
        <div className='info'>
          <p>
            We attempted to submit your transaction but ran into an unexpected
            error. The smart contract sent the following error message:
          </p>
        </div>

        <div className='message'>
          <p>{message}</p>
        </div>

        <div className='reason'>
          <p>
            Could not estimate gas for &quot;{methodName}&quot;. args:{' '}
            {JSON.stringify(args)}
          </p>
        </div>
      </div>

      <hr />

      <div className='suggestion'>
        <p>
          While we do not suggest it, you may force this transaction to be sent
          nonetheless.
        </p>
      </div>

      <div className='buttons'>
        <button className='cancel' onClick={() => close()}>
          Cancel
        </button>

        <button
          className='send'
          onClick={async () => {
            if (fn && successCb) {
              await fn({
                force: true,
                onSuccess: async (tx) => {
                  await tx?.wait();
                  await successCb();
                },
              });
            }
            close();
          }}
        >
          Send Transaction Ignoring This Error
        </button>
      </div>
    </Modal>
  );
};

export default ForceTxPopup;
