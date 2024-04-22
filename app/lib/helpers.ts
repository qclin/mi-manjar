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

export const isInViewport = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const isElementOverlappingViewport = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // Check if any part of the element is within the viewport

  console.log(
    "isElementOverlappingViewport --- ",
    window.innerHeight,
    rect.bottom
  );

  return (
    rect.bottom > 0 && // Bottom edge is below the top of the viewport
    rect.right > 0 && // Right edge is to the right of the left side of the viewport
    rect.top < windowHeight && // Top edge is above the bottom of the viewport
    rect.left < windowWidth // Left edge is to the left of the right side of the viewport
  );
};
