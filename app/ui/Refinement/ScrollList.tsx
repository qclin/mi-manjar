import React, { useRef, useEffect, useState } from "react";
import NextIcon from "@/public/icons/next.svg";

const ScrollList = ({ children }: React.PropsWithChildren) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    if (scrollRef.current && containerRef.current) {
      const { scrollWidth } = scrollRef.current;
      const containerWidth = containerRef.current.clientWidth;
      if (scrollWidth <= containerWidth) {
        setShowLeftArrow(false);
        setShowRightArrow(false);
      }
    }
  }, [scrollRef.current, containerRef.current]);

  const updateArrows = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center px-4 md:px-0" ref={containerRef}>
      {showLeftArrow && (
        <button
          className="absolute -left-10 z-10 rotate-180"
          onClick={scrollLeft}
        >
          <NextIcon />
        </button>
      )}
      <ul
        ref={scrollRef}
        className="scrollbar-hide flex snap-x space-x-4 overflow-x-auto"
        style={{ scrollBehavior: "smooth" }}
        onScroll={updateArrows}
      >
        {children}
      </ul>
      {showRightArrow && (
        <button className="absolute -right-10 z-10" onClick={scrollRight}>
          <NextIcon />
        </button>
      )}
    </div>
  );
};

export default ScrollList;
