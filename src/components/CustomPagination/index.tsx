import { ButtonHTMLAttributes, ReactNode, useEffect } from 'react';

import { Icon } from '@/elements/Icon';

import { classNames } from '@/lib/utils';
import usePagination from '@/hooks/usePagination';

const CustomPagination = ({
  total,
  onChange,
}: {
  total: number;
  onChange?: (_value: number) => any;
}) => {
  const { next, previous, range, setPage, active } = usePagination({
    total: total,
  });

  useEffect(() => {
    onChange && onChange(active);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, total]);

  const ControlButton = ({
    children,
    ...buttonProps
  }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) => (
    <button className='control' {...buttonProps}>
      {children}
    </button>
  );

  return (
    <div className='pagination wrapper'>
      <ControlButton
        onClick={() => {
          // onChange && onChange(active - 1);
          previous();
        }}
        disabled={active === 1}
      >
        <Icon variant={'arrow-left'} size={'lg'} />
        Previous
      </ControlButton>

      <div className='pages'>
        {range.map((page, idx) =>
          !page ? (
            <span className='dots' key={idx}>
              ...
            </span>
          ) : (
            <button
              onClick={() => {
                // onChange && onChange(page);
                setPage(page);
              }}
              className={classNames(active === page && 'active', 'page')}
              key={idx}
            >
              {page}
            </button>
          )
        )}
      </div>

      <ControlButton
        onClick={() => {
          // onChange && onChange(active + 1);
          next();
        }}
        disabled={!total || active === total}
      >
        Next
        <Icon variant={'arrow-right'} size={'lg'} />
      </ControlButton>
    </div>
  );
};

export default CustomPagination;
