import { mask, unMask } from 'remask';

interface FoneMaskProps {
  value: string;
}

function FoneMask(props: FoneMaskProps) {
  const { value } = props;

  if (!value) {
    return null;
  }

  const maskedValue = mask(unMask(value), ['(99)-9999-9999)', '(99) 9 9999-9999']);

  return (
    <span>{maskedValue}</span>
  );
}

export default FoneMask;
