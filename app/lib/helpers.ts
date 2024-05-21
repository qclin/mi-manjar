// Function to convert subtitle format timestamp to seconds
export const subtitleFormatToSeconds = (subtitleFormat: string): number => {
  const parts = subtitleFormat.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const secondsParts = parts[2].split(",");
  const seconds = parseInt(secondsParts[0], 10);
  const milliseconds = parseInt(secondsParts[1], 10) / 1000;
  return hours * 3600 + minutes * 60 + seconds + milliseconds;
};

export const convertMillisecondsToSeconds = (milliseconds: number): number => {
  // Divide by 1000 to convert milliseconds to seconds
  const seconds = milliseconds / 1000;
  return parseFloat(seconds.toFixed(6));
};

export const convertMillisecondsToDisplayFriendly = (
  milliseconds: number
): string => {
  const seconds = Math.floor(milliseconds / 1000);
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  // Format to HH:MM:SS
  return `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
};

function padWithZero(num: number): string {
  return num.toString().padStart(2, "0");
}

export const convertMillisecondsToDisplayDuration = (
  milliseconds: number
): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  // Format to HH:MM:SS
  return `${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
};

export const isElementInViewport = (
  element: HTMLElement,
  topOffset = 0,
  bottomOffset = 0
) => {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return (
    rect.top >= topOffset &&
    rect.left >= 0 &&
    rect.bottom <= viewportHeight - bottomOffset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const scrollToElementCenter = (
  element: HTMLElement,
  topOffset = 0,
  bottomOffset = 0
) => {
  // Scroll the element into view, centered in the viewport considering the offsets
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });

  // Adjust the scroll position after a short delay to ensure it's centered considering the offsets
  setTimeout(() => {
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.scrollY;
    const offsetPosition =
      absoluteElementTop -
      (window.innerHeight - topOffset - bottomOffset) / 2 +
      elementRect.height / 2;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, 300); // Delay in milliseconds; adjust if necessary
};
