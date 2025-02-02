import React, { useEffect, useRef, memo } from "react";
import { getFormattedSymbol } from '../utils/symbolUtils';

declare global {
  interface Window {
    TradingView: {
      widget: new (config: any) => any;
    }
  }
}

interface StockChartProps {
  symbol: string;
  width?: string;
  height?: string;
}

function StockChart({ 
  symbol, 
  width = "100%", 
  height = "600px" 
}: StockChartProps) {
  const container = useRef<HTMLDivElement>(null);
  const containerId = `tradingview_${Math.random().toString(36).substring(7)}`;

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = "";

      const finalSymbol = getFormattedSymbol(symbol);

      const widgetContainer = document.createElement("div");
      widgetContainer.id = containerId;
      widgetContainer.style.height = "100%";
      widgetContainer.style.width = "100%";
      container.current.appendChild(widgetContainer);

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        if (window.TradingView) {
          try {
            new window.TradingView.widget({
              autosize: true,
              symbol: finalSymbol,
              interval: "D",
              timezone: "Etc/UTC",
              theme: "light",
              style: "1",
              locale: "en",
              hide_top_toolbar: false,
              hide_side_toolbar: false,
              toolbar_bg: "#f1f3f6",
              enable_publishing: false,
              allow_symbol_change: false,
              details: true,
              container_id: containerId,
              height: "100%",
              width: "100%"
            });
          } catch (error) {
            console.error('TradingView widget error:', error);
          }
        }
      };

      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [symbol]);

  return (
    <div 
      ref={container}
      style={{
        width: width,
        height: height,
        position: "relative",
        display: "block",
        overflow: "hidden",
        maxWidth: "100%"
      }}
    />
  );
}

export default memo(StockChart);

