import { Components } from "icons";

export const components = {
  "ethereum-blue": Components.SvgEthereumBlue,
  "arbitrum-round": Components.SvgArbitrumRound,
  "binance-wallet": Components.BinanceWallet,
  "base-goerli": Components.SvgBaseGoerli,
  polygon: Components.SvgPolygon,

  "arrow-left": Components.ArrowLeft,
  "arrow-right": Components.ArrowRight,
  "copy-01": Components.Copy01,
  "link-external-01": Components.LinkExternal01,
  "log-out-01": Components.LogOut01,
  "npm-full-light": Components.NpmFullLight,
  "chevron-down": Components.ChevronDown,
  "help-circle": Components.HelpCircle,
  "wallet-03": Components.Wallet03,
  metamask: Components.Metamask,
  "google-calendar": Components.GoogleCalendar,
  x: Components.X,
};

export const Icon = ({
  variant,
  size = "md",
  className = "",
}: {
  variant: keyof typeof components;
  size: "xs" | "sm" | "md" | "lg" | "xl" | "regular" | "2xl";
  className?: string;
}) => {
  const Component = components[variant] || null;

  return (
    <i data-size={size}>{Component && <Component className={className} />}</i>
  );
};
