import { chainsArray, networkData } from "@/constant/chains";
import { Icon } from "@/elements/Icon";
import useEagerConnect from "@/hooks/useEagerConnect";
import { setupNetwork } from "@/lib/wallet";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

const chainList = chainsArray.map((item) => ({
  label: item.name,
  value: item.chainId.toString(),
}));

const NetworkSwitchDropdown = () => {
  const { chainId } = useWeb3React();
  useEagerConnect();

  const [selected, setSelected] = useState<
    { label: string; value: string } | undefined
  >();

  useEffect(() => {
    setSelected(chainList.find((c) => c.value === chainId?.toString()));
  }, [chainId]);
  const logo =
    selected &&
    networkData[Number(selected.value) as SUPPORTED_CHAIN_TYPE]?.logo;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className="DropdownmenuTrigger">
        <button className="wrapper">
          <Icon
            variant={logo ? logo : "help-circle"}
            className="icon"
            size="md"
          />
          <p className="name">
            {selected ? selected.label : "Unsupported Chain!"}
          </p>
          <Icon variant="chevron-down" size="md" className="right section" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="DropdownmenuContent"
          sideOffset={8}
          align="end"
        >
          {chainList.map(({ label, value }, idx) => (
            <DropdownMenu.Item
              key={idx}
              onClick={async () => {
                const _selectedChain = chainsArray.find(
                  (c) => c.chainId.toString() === value
                );
                if (!_selectedChain) return;

                const networkSwitchSuccess = await setupNetwork(
                  _selectedChain.chainId
                );
                if (networkSwitchSuccess) setSelected({ label, value });
              }}
              className="DropdownmenuItem"
            >
              {label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default NetworkSwitchDropdown;
