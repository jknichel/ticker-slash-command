// Module provides a function that returns the HTML required to get a TradingView chart for the specified ticker.

module.exports = function (ticker) {
    return `<div id="tv-medium-widget"></div>
    <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
    <script type="text/javascript">
    new TradingView.MediumWidget({
      "container_id": "tv-medium-widget",
      "symbols": [
        [
          "${ticker}",
          "${ticker}"
        ]
      ],
      "gridLineColor": "#e9e9ea",
      "fontColor": "#83888D",
      "underLineColor": "#dbeffb",
      "trendLineColor": "#4bafe9",
      "width": "500px",
      "height": "300px",
      "locale": "en"
    });
    </script>`;
}
