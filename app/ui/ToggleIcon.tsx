import PlusIcon from "@/public/icons/plus.svg";
import MinusIcon from "@/public/icons/minus.svg";

type Props = {
  isOpen: boolean;
  altText: string;
};
const ToggleIcon = ({ isOpen, altText }: Props) => {
  return isOpen ? (
    <MinusIcon alt={altText} width={14} height={14} />
  ) : (
    <PlusIcon alt={altText} width={14} height={14} />
  );
};

export default ToggleIcon;
