export default function useString() {
  const randomColor = (): string => {
    const randomIdx = Math.floor(Math.random() * 3);
    const colors = [
      "#0CAE13",
      "#FE0000",
      "#CFBB03",

      // "#06177A",
      // "#F65901",
      // "#AE0C0C",
      // "#AE6D0C",
      // "#AE0C6D",
      // "#0C6AAE",
      // "#0CAEA5",
    ];

    return colors[randomIdx] as string;
  };

  return { randomColor };
}
