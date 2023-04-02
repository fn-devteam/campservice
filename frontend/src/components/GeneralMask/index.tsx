import { mask, unMask } from 'remask';

interface GeneralMaskProps {
  value: string,
  maskInput : []
}

function GeneralMask(props: GeneralMaskProps) {
  const { value , maskInput} = props;

  if (!value) {
    return null;
  }

  const maskedValue = mask(unMask(value), maskInput);

  return (
    <span>{maskedValue}</span>
  );
}

export default GeneralMask;
