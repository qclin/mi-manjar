import PlusIcon from "@/public/icons/plus.svg";
import MinusIcon from "@/public/icons/minus.svg";

type Props = {
  isOpen: boolean;
  altText: string;
  className?: string;
};
const ToggleIcon = ({ isOpen, altText, className }: Props) => {
  return isOpen ? (
    <MinusIcon alt={altText} width={14} height={14} className={className} />
  ) : (
    <PlusIcon alt={altText} width={14} height={14} className={className} />
  );
};

export default ToggleIcon;
