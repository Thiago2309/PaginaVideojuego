import { useState, useEffect, useRef } from "react";
import useDebounce from "./useDebounce";  // Asegúrate de importar el hook de debounce

const useTruncateText = (text: string, maxHeights: { xs: number, sm: number, md: number, lg: number, xl: number }) => {
  const [truncatedText, setTruncatedText] = useState(text);
  const textRef = useRef<HTMLDivElement>(null);

  const getMaxHeight = () => {
    const width = window.innerWidth;
    if (width >= 1920) return maxHeights.xl;
    if (width >= 1280) return maxHeights.lg;
    if (width >= 960) return maxHeights.md;
    if (width >= 600) return maxHeights.sm;
    return maxHeights.xs;
  };

  const truncateText = () => {
    if (textRef.current) {
      const originalText = text;
      let truncated = originalText;
      const maxHeight = getMaxHeight();

      textRef.current.textContent = truncated;
      while (textRef.current.scrollHeight > maxHeight && truncated.length > 0) {
        truncated = truncated.substring(0, truncated.length - 1);
        textRef.current.textContent = truncated + "...";
      }
      setTruncatedText(truncated + "...");
    }
  };

  const debouncedResize = useDebounce(window.innerWidth, 300); // Ajusta el delay según sea necesario

  useEffect(() => {
    truncateText();
  }, [text, maxHeights, debouncedResize]);

  return { truncatedText, textRef };
};

export default useTruncateText;
