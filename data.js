var startStocks = [

  {name: "YHOO", buy:32.91, sell: 31.50, up:1},
  {name: "GOOG", buy:738.87, sell: 736.45, up:1},
  {name: "BT.A", buy:460.55, sell: 460.00, up:1},
  {name: "MSFT", buy:55.21, sell: 54.06, up:1},
  {name: "TYO", buy:298, sell: 297.5, up:1},
  {name: "HPQ", buy:12.21, sell: 12, up:1},
  {name: "WMT", buy:59.35, sell: 58.74, up:1},
  {name: "XOM", buy:74.47, sell: 74.12, up:1},
  {name: "BRK.B", buy:130.49, sell: 129.90, up:1},
  {name: "AAPL", buy:113.18, sell: 112.95, up:1},
  {name: "GM", buy:34.55, sell: 33.96, up:1},
  {name: "PSX", buy:82.79, sell: 82.65, up:1},
  {name: "F", buy:13.75, sell: 13.64, up:1},
  {name: "CVS", buy:93.25, sell: 93.12, up:1},
]

var startMoney = 100000

var newsStories = [
  "Apple sues Microsoft for murder of Steve Jobs",
  "Fridge looks like iPhone! Judge in Texas sides with Apple",
  "New MacBook as powerful as ENIAC super computer",
  "President NoBama dies of exhaustion after debating gun control with Donald Trump",
  "'I've had a hard life' - Donald Trump",
  "Catholic church declares abortion compulsory and buggery is strongly advised",
  "Mexico agrees to pay for Trump's wall, if he stays on the other side!",
  "Hillary Clinton declares herself God",
  "David Cameron accused of distributing 'weed' to Jacob Rees-Mogg"
]

var swingThresh = 0.07

var bank = {
  credit: 100000,
  loan: 0,
  intrest: 1.01,
  paymentpertick: 0,
  startcredit: 100000
}
