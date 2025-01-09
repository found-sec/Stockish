import React, { useEffect } from 'react';
import { getFormattedSymbol } from '../utils/symbolUtils';

interface TradingViewWidgetProps {
  symbol?: string;
  width?: string | number;
  height?: string | number;
  colorTheme?: 'light' | 'dark';
  isTransparent?: boolean;
  locale?: string;
}

const SymbolProfileWidget: React.FC<TradingViewWidgetProps> = ({
  symbol = 'NASDAQ:AAPL',
  width = '1000',
  height = '400',
  colorTheme = 'light',
  isTransparent = true,
  locale = 'en',
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: getFormattedSymbol(symbol),
      width,
      height,
      colorTheme,
      isTransparent,
      locale,
    });

    const container = document.querySelector('.tradingview-widget-container__widget');
    container?.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = ''; // Clear the container to remove the old widget
      }
    };
  }, [symbol, width, height, colorTheme, isTransparent, locale]);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
};

export default SymbolProfileWidget;
