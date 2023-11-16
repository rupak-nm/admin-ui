import * as Tooltip from "@radix-ui/react-tooltip";
import { FC, ReactNode } from "react";

export const CustomTooltip: FC<{
  children: ReactNode;
  tooltipLabel: {
    title: ReactNode;
    desc: ReactNode;
  };
}> = ({ children, tooltipLabel }) => {
  return (
    <Tooltip.Provider delayDuration={50}>
      <Tooltip.Root>
        <Tooltip.Trigger className="TooltipTrigger" tabIndex={-1}>
          {children}
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent"
            side="top"
            alignOffset={32}
          >
            <div className="content">
              <p className="title">{tooltipLabel.title}</p>
              <p className="desc">{tooltipLabel.desc}</p>
            </div>

            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CustomTooltip;
