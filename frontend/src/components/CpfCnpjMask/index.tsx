import { mask, unMask } from 'remask';

interface CpfCnpjMaskProps {
  value: string;
}

function CpfCnpjMask(props: CpfCnpjMaskProps) {
  const { value } = props;

  if (!value) {
    return null;
  }

  const maskedValue = mask(unMask(value), ['999.999.999-99', '99.999.999/9999-99']);

  return (
    <span>{maskedValue}</span>
  );
}

export default CpfCnpjMask;
