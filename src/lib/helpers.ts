export const truncateAddress = (addr: string) => {
  return addr.substring(0, 4) + '....' + addr.slice(-4);
};
