import React, { useEffect } from 'react';

const TickerTapeScript: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;

    const scriptConfig = {
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { description: "Apple", proName: "NASDAQ:AAPL" },
        { description: "NVIDIA", proName: "NASDAQ:NVDA" },
        { description: "Microsoft", proName: "NASDAQ:MSFT" },
        { description: "Tesla", proName: "NASDAQ:TSLA" },
        { description: "Spotify", proName: "NYSE:SPOT" },
        { description: "Amazon", proName: "NASDAQ:AMZN" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "light",
      locale: "en",
    };

    script.textContent = JSON.stringify(scriptConfig);

    const container = document.getElementById("tradingview-ticker-tape-widget");
    if (container) {
      // Append script only if it doesn't already exist
      if (!container.querySelector("script[src='https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js']")) {
        container.appendChild(script);
      }
    }

    return () => {
      // Clean up script when component unmounts
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" id="tradingview-ticker-tape-widget">
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TickerTapeScript;
