export default function useString() {
  const randomColor = (): string => {
    const randomIdx = Math.floor(Math.random() * 9);
    const colors = [
      "#FE0000",
      "#06177A",
      "#F65901",
      "#0CAE13",
      "#CFBB03",
      "#AE0C0C",
      "#AE6D0C",
      "#AE0C6D",
      "#0C6AAE",
      "#0CAEA5",
    ];

    return colors[randomIdx] as string;
  };

  return { randomColor };
}
