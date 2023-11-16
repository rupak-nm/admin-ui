import * as React from 'react';

import { classNames } from '@/lib/utils';

type SkeletonProps = {
  circle?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Skeleton({
  className,
  circle,
  ...rest
}: SkeletonProps) {
  return (
    <div
      className={classNames('skeleton wrapper', circle && 'circle', className)}
      {...rest}
    />
  );
}
