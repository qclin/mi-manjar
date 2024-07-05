import { Transition } from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";
import ExpandIcon from "@/public/icons/expand.svg";
import CloseIcon from "@/public/icons/close.svg";
import { ReactNode } from "react";

type Props = {
  title: string;
  preview: ReactNode;
  children: ReactNode;
};

const ExpandableView = ({ title, preview, children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const Header = ({ className }: { className?: string }) => (
    <h1 className={clsx("uppercase text-primary", className)}>{title}</h1>
  );

  const bgColors = {
    container: clsx("bg-gray-200 dark:bg-gray-600"),
    button: clsx("rounded-full bg-white/60 p-2 dark:bg-black/60"),
  };

  return (
    <div className="relative">
      <div className={clsx("relative", isExpanded ? "h-screen" : "h-auto")}>
        <div
          className={clsx(
            "mx-3 my-5 h-3/5 overflow-y-hidden rounded-lg border border-black dark:border-white",
            bgColors.container
          )}
        >
          <div className="flex items-center justify-between px-3 py-2">
            <Header />
            <button
              onClick={() => setIsExpanded(true)}
              className={clsx(isExpanded ? "hidden" : "block", bgColors.button)}
            >
              <ExpandIcon alt="expand" className="text-primary" />
            </button>
          </div>
          <p className="text-2xl text-secondary/75">{preview}</p>
        </div>
      </div>

      <Transition
        show={isExpanded}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 transform scale-95"
        enterTo="opacity-100 transform scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 transform scale-100"
        leaveTo="opacity-0 transform scale-95"
      >
        <div
          className={clsx(
            "fixed inset-0 z-30 flex flex-col pb-32",
            bgColors.container
          )}
        >
          <button
            onClick={() => setIsExpanded(false)}
            className={clsx("fixed right-0 m-4", bgColors.button)}
          >
            <CloseIcon
              alt="close"
              className="text-primary"
              width="15"
              height="15"
            />
          </button>

          <div>
            <Header className="m-4" />
            {children}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default ExpandableView;
