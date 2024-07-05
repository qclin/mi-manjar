import PlusIcon from "@/public/icons/plus.svg";
import MinusIcon from "@/public/icons/minus.svg";

type Props = {
  isOpen: boolean;
  altText: string;
  className?: string;
  size?: number;
};
const ToggleIcon = ({ isOpen, altText, className, size = 16 }: Props) => {
  return isOpen ? (
    <MinusIcon alt={altText} width={size} height={size} className={className} />
  ) : (
    <PlusIcon alt={altText} width={size} height={size} className={className} />
  );
};

export default ToggleIcon;
