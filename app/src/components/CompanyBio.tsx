import React, { useEffect } from 'react';
import { getFormattedSymbol } from '../utils/symbolUtils';

interface TradingViewWidgetProps {
  width?: string;
  height?: string;
  colorTheme?: 'light' | 'dark';
  symbol?: string;
  locale?: string;
}

const CompanyBioWidget: React.FC<TradingViewWidgetProps> = ({
  width = '1400',
  height = '400',
  colorTheme = 'light',
  symbol = 'NASDAQ:AAPL',
  locale = 'en',
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width,
      height,
      isTransparent: true,
      colorTheme,
      symbol: getFormattedSymbol(symbol),
      locale,
    });

    const container = document.getElementById('tradingview-widget-container');
    if (container) {
      container.appendChild(script);
    }

    // Cleanup: Remove the script when the component unmounts
    // return () => {
    //   if (container) container.innerHTML = '';
    // };
  }, [width, height, colorTheme, symbol, locale]);

  return (
    <div
      className="tradingview-widget-container"
      id="tradingview-widget-container"
      style={{ width: `${width}`, height: `${height}`, margin: '0 auto', position: 'relative' }}
    >
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright" style={{ pointerEvents: 'none' }}>
      </div>
    </div>
  );
};

export default CompanyBioWidget;
