import { useWeb3React } from "@web3-react/core";
import dayjs from "dayjs";
import React, { Fragment, LegacyRef, useState } from "react";

import { classNames } from "@/lib/utils";
import useUpdateAndAccrueCycle from "@/hooks/useUpdateAndAccrueCycle";

import CustomTooltip from "@/components/CustomTooltip";
import ForceTxPopup from "@/components/ForceTxPopup";
import Skeleton from "@/components/Skeleton";

import { networkData } from "@/constant/chains";
import { Icon } from "@/elements/Icon";

export const cols = [
  {
    title: "Cover",
    render: (props: TableComponentProps, cellKey: string | number) => (
      <CoverNameRenderer {...props} key={cellKey} />
    ),
  },
  {
    title: "Chain",
    render: (props: TableComponentProps, cellKey: string | number) => (
      <ChainLogoRenderer {...props} key={cellKey} />
    ),
  },
  {
    title: "Unlock Cycle",
    render: (props: TableComponentProps, cellKey: string | number) => (
      <OpenCloseCyclesRenderer {...props} key={cellKey} />
    ),
  },
  {
    title: "",
    render: (props: TableComponentProps, cellKey: string | number) => (
      <CalendarRenderer {...props} key={cellKey} />
    ),
  },
  {
    title: "",
    render: (props: TableComponentProps, cellKey: string | number) => (
      <ActionButtonsRenderer {...props} key={cellKey} />
    ),
  },
];

const CoverNameRenderer = ({ dataRow }: TableComponentProps) => (
  <td className="cover name">{dataRow.coverInfo.coverInfoDetails.coverName}</td>
);

const ChainLogoRenderer = ({ dataRow }: TableComponentProps) => {
  const { logo } = networkData[dataRow.chain];
  const title = `${networkData[dataRow.chain].name} [${dataRow.chain}]`;

  return (
    <td className="chain logo">
      <span title={title}>
        <Icon variant={logo} size="xl" />
      </span>
    </td>
  );
};

const OpenCloseCyclesRenderer = ({ dataRow }: TableComponentProps) => {
  const openDate = dayjs.unix(Number(dataRow.vaultInfo.withdrawalStarts));
  const closeDate = dayjs.unix(Number(dataRow.vaultInfo.withdrawalEnds));

  return (
    <td className="open close cycles">
      <p>
        <b>Open: </b>
        <span title={openDate.toDate().toString()}>{openDate.toString()}</span>
      </p>
      <p>
        <b>Close: </b>
        <span title={closeDate.toDate().toString()}>
          {closeDate.toString()}
        </span>
      </p>
    </td>
  );
};

const CalendarRenderer = ({ dataRow }: TableComponentProps) => {
  const text = "Unlock Date";
  const details = `[${
    networkData[dataRow.chain].abbreviation
  }] Unlock Cycle for ${dataRow.coverInfo.coverInfoDetails.coverName} Pool`;
  const dates = {
    from: dayjs
      .unix(Number(dataRow.vaultInfo.withdrawalStarts))
      .format("YYYYMMDDTHHMMSSZ"),
    to: dayjs
      .unix(Number(dataRow.vaultInfo.withdrawalEnds))
      .format("YYYYMMDDTHHMMSSZ"),
  };
  const calendarLink = encodeURI(
    `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates.from}/${dates.to}&details=${details}&location=`
  );

  return (
    <td className="calendar">
      <CustomTooltip
        tooltipLabel={{
          title: "Add to Google Calender",
          desc: "Add Open Cycle date to Google Calendar",
        }}
      >
        <a href={calendarLink} target="_blank" className="icon link">
          <Icon variant="google-calendar" size="lg" />
        </a>
      </CustomTooltip>
    </td>
  );
};

const ActionButtonsRenderer = ({ dataRow, extraData }: TableComponentProps) => {
  const [forceTxData, setForceTxData] = useState<{
    methodName: string;
    args: string[];
    message: string;
    fn: (_props: HookMethodArgs) => void;
  } | null>(null);

  const {
    chain,
    vaultInfo: { withdrawalStarts, withdrawalEnds, isAccrualComplete },
    coverInfo: { coverKey },
  } = dataRow;
  const openDate = dayjs.unix(Number(withdrawalStarts));
  const closeDate = dayjs.unix(Number(withdrawalEnds));
  const currentDate = dayjs();

  const { chainId, account } = useWeb3React();

  const { update, accrue } = useUpdateAndAccrueCycle({ coverKey });

  const canAccrue =
    openDate.isBefore(currentDate) &&
    closeDate.isAfter(currentDate) &&
    !isAccrualComplete;
  const canUpdate = closeDate.isBefore(currentDate);

  const btnDisabled = chain !== chainId;

  const handleClick = async () => {
    if (canAccrue) {
      await accrue({
        onError: (err) => {
          setForceTxData({
            message: err.err,
            args: err.args,
            methodName: err.methodName,
            fn: accrue,
          });
        },
      });
      return;
    }

    await update({
      onError: (err) => {
        setForceTxData({
          message: err.err,
          args: err.args,
          methodName: err.methodName,
          fn: update,
        });
      },
    });
  };

  const Button = React.forwardRef(
    (_, ref: LegacyRef<HTMLButtonElement> | undefined) => (
      <button
        ref={ref}
        className={classNames(
          "action",
          canAccrue && "accrue",
          btnDisabled && "disabled"
        )}
        tabIndex={btnDisabled ? -1 : 0}
        onClick={() => handleClick()}
      >
        {canAccrue ? "Accrue" : "Update"}
      </button>
    )
  );

  Button.displayName = "Button";

  return (
    <Fragment>
      <td className="action buttons">
        {(canAccrue || canUpdate) && (
          <>
            {btnDisabled ? (
              <CustomTooltip
                tooltipLabel={{
                  title: !account ? "Connect Wallet" : "Invalid Network",
                  desc: !account
                    ? `Connect your account to ${
                        canAccrue ? "Accrue" : "Update"
                      }`
                    : `Switch to ${
                        networkData[chain as SUPPORTED_CHAIN_TYPE].name
                      } Network`,
                }}
              >
                <Button />
              </CustomTooltip>
            ) : (
              <Button />
            )}
          </>
        )}
      </td>

      <ForceTxPopup
        open={Boolean(forceTxData)}
        close={() => setForceTxData(null)}
        message={forceTxData?.message || ""}
        args={forceTxData?.args || []}
        methodName={forceTxData?.methodName || ""}
        fn={forceTxData?.fn}
        successCb={extraData?.updateFunction}
      />
    </Fragment>
  );
};

export const SkeletonTableRows = ({ count = 1 }) => {
  const Row = () => (
    <tr className="skeleton row">
      <td>
        <Skeleton className="name" />
      </td>
      <td>
        <Skeleton circle className="logo" />
      </td>
      <td>
        <Skeleton className="open" />
        <Skeleton className="close" />
      </td>
      <td>
        <Skeleton className="calendar" />
      </td>
      <td>
        <Skeleton className="button" />
      </td>
    </tr>
  );

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <Row key={i} />
        ))}
    </>
  );
};
