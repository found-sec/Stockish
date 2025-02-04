import React, { useEffect, useRef } from "react";
import { getFormattedSymbol } from '../utils/symbolUtils';
import { isCryptoSymbol } from '../../../server/src/utils/assetTypes';

interface SymbolInfoProps {
  symbol: string;
  width?: string;
  locale?: string;
  colorTheme?: "light" | "dark";
  isTransparent?: boolean;
}

const SymbolInfoWidget: React.FC<SymbolInfoProps> = ({
  symbol = "NASDAQ:AAPL",
  width = "100%",
  locale = "en",
  colorTheme = "light",
  isTransparent = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      // check if symbol is crypto
      if (isCryptoSymbol(symbol)) {
        containerRef.current.innerHTML = "Cryptocurrency symbols are not supported";
        return;
      }

      const finalSymbol = getFormattedSymbol(symbol);
      console.log('Original symbol:', symbol);
      console.log('Final symbol:', finalSymbol);

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: finalSymbol,
        width,
        locale,
        colorTheme,
        isTransparent,
      });

      containerRef.current.appendChild(script);
    }
  }, [symbol, width, locale, colorTheme, isTransparent]);

  return <div ref={containerRef}></div>;
};

export default SymbolInfoWidget;
