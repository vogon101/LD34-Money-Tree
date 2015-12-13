var nextStockId = 0
var money = startMoney
startStocks.forEach(function (e,i,a) {e.owned = 0 })
var stocks = startStocks
var latestNews = "Welcome to MoneyTree"

var isInAlert = false

function addStockToTicker(name, cost, up) {
  id="stock-ticker-" + nextStockId
  c = (up==2 ? "up" : (up == 0 ? "down" : "nochange"))
  i = (up==2 ? "<i class='fa fa-caret-up'></i>" : (up == 0 ? "<i class='fa fa-caret-down'></i>" : " "))
  $("#ticker").append("<stock id='" + id + "' class='" + c + "'>" + name + "<icon>" + i + "</icon>$<cost>" + format(cost,2) + "</cost></stock><sep/>")
  nextStockId += 1
  return id
}

function updateStockOnTicker(cost, up, id) {
  i = (up==2 ? "<i class='fa fa-caret-up'></i>" : (up == 0 ? "<i class='fa fa-caret-down'></i>" : " "))
  c = (up==2 ? "up" : (up == 0 ? "down" : "nochange"))
  $("#" + id + ">cost").each(function () {$(this).html(format(cost,2))})
  $("#" + id + ">icon").each(function () {$(this).html(i)})
  $("#" + id).each(function () {$(this).removeClass()})
  $("#" + id).each(function () {$(this).addClass(c)})
}

function addStockToBuySell (name, buy, sell, up, ownded, index) {
  id="stock-" + nextStockId
  c = (up==2 ? "up" : (up == 0 ? "down" : "nochange"))
  i = (up==2 ? "<i class='fa fa-caret-up'></i>" : (up == 0 ? "<i class='fa fa-caret-down'></i>" : "<i class='fa fa-minus'></i>"))
  $(".main>table>tbody").append("<tr id='" + id + "' class='" + c + "'>"+
                                "<td class='stock-name'>" + name + "</td>"+
                                "<td class='stock-icon'><icon>" + i + "</icon></td>"+
                                "<td class='stock-cost-buy'>$<cost>" + format(buy,2) + "</cost></td>"+
                                "<td class='stock-cost-sell'>$<cost>" + format(sell,2) + "</cost></td>"+
                                "<td class='stock-owned'>" + ownded + "</td>"+
                                "<td id='stock-buysell'><a href='#' onclick='buy(10, " + index + ")'>10</a><a href='#' onclick='buy(100, " + index + ")'>100</a><a href='#' onclick='buy(1000, " + index + ")'>1000</a><a href='#' onclick='buy(-1, " + index + ")'>Max</a></td>"+
                                "<td id='stock-buysell'><a href='#' onclick='sell(10, " + index + ")'>10</a><a href='#' onclick='sell(100, " + index + ")'>100</a><a href='#' onclick='sell(1000, " + index + ")'>1000</a><a href='#' onclick='sell(-1, " + index + ")'>All</a></td></tr>")
  nextStockId += 1
  return id
}

function updateStockBuySell (name, buy, sell, up, owned, id) {
  c = (up==2 ? "up" : (up == 0 ? "down" : "nochange"))
  i = (up==2 ? "<i class='fa fa-caret-up'></i>" : (up == 0 ? "<i class='fa fa-caret-down'></i>" : "<i class='fa fa-minus'></i>"))
  $("#" + id + ">.stock-icon").html(i)
  $("#" + id + ">.stock-owned").html(owned)
  $("#" + id + ">.stock-cost-buy").html(format(buy, 2))
  $("#" + id + ">.stock-cost-sell").html(format(sell, 2))
  $("#" + id).removeClass()
  $("#" + id).addClass(c)
}


function updateNews(news) {
  $("#news").html("NEWS : " + news)
}

function buy(quantity, index) {
  console.log("Buying " + quantity + " of " + stocks[index].name)
  if (quantity == -1) {
    quantity = Math.floor(money/stocks[index].buy)
  }
  if (stocks[index].buy * quantity > money) {
    $("#error").html("Not enough money")
  }
  else {
    stocks[index].owned += quantity
    money -= stocks[index].buy * quantity
    stocks[index].buy *= (1 + 0.2*(quantity/10000))
    stocks[index].sell *= (1 + 0.15*(quantity/10000))
    if (quantity >= 100)
      stocks[index].up = 2
  }
}

function sell(quantity, index) {
  console.log("Selling " + quantity + " of " + stocks[index].name)
  if (quantity == -1) {
    quantity = stocks[index].owned
  }
  if (quantity > stocks[index].owned) {
    $("#error").html("Not enough stocks")
  }
  else {
    stocks[index].owned -=quantity
    money += stocks[index].sell * quantity
    stocks[index].buy = stocks[index].buy * (1 + 0.2*(quantity/10000))
    stocks[index].sell = stocks[index].sell / (1 + 0.15*(quantity/10000))
    if (quantity >= 100)
      stocks[index].up = 0
  }
}

function doMarket() {
  stocks.forEach(function (e,i,a) {
    target = 0
    if (e.up == 2) {
      if (getNetWorth() > 500000)
          target = -swingThresh + 0.03
      else
        target = -swingThresh
    }
    if (e.up == 0) {
      if (getNetWorth() > 500000)
          target = swingThresh + 0.03
      else
        target = swingThresh
    }
    value = getRandom(-0.15, 0.15)

    if (value > 1) {

    }

    if (value > target) {
      if (value < 0) {
        value += Math.abs(target)
      }
      e.up = 2
      pcChange = 1 + value/10
      if (pcChange < 1) {
        console.log("Value : " + value)
        console.log("Target : " + target)
        console.log(pcChange)
        console.log("This is a bad thing, value < 1")
      }
    }
    else if (value < target) {
      if (value > 0) {
        value -= Math.abs(target)
      }
      e.up =0
      pcChange = 1 + value/10
      if (pcChange > 1) {
        console.log("Value : " + value)
        console.log("Target : " + target)
        console.log(pcChange)
        console.log("This is a bad thing, value > 1")
      }
    }
    else {
      e.up = 1
      pcChange = 1
    }
    e.buy = e.buy*pcChange
    e.sell = e.sell*pcChange
  })
  bank.credit = bank.startcredit - bank.loan
  bank.loan = bank.loan * bank.intrest

  if (bank.loan/50 < 1 && bank.loan > 0)
    bank.paymentpertick = 1
  else {
    bank.paymentpertick = bank.loan/50
  }
  money -= bank.paymentpertick
  if (bank.loan - bank.paymentpertick > 0)
    bank.loan -= bank.paymentpertick
  else
    bank.loan = 0
}

function updateAll() {

  $("#money").html(format(money,2))
  $("#netw").html(format(getNetWorth(), 2))
  $("#creditavaliable").html("$" + format(bank.credit, 2))
  $("#loanremaining").html("$" + format(bank.loan,2))
  $("#paypertick").html("$" + format(bank.paymentpertick, 2))
  $("#intrestrate").html(format((bank.intrest-1)*100, 2) + "%")
  updateNews(latestNews)
  updateStocks(stocks)

  if (getNetWorth() > 1000000) {
    if (!isInAlert) {
      window.location = "index.html?lose=2"
      isInAlert = true
    }
  }
  if (money < -100000) {
    if (!isInAlert) {
      window.location = "index.html?lose=1"
      isInAlert = true
    }
  }

}

function updateStocks (stocks) {
  stocks.forEach(function (e,i,a) {
    updateStockOnTicker((e.buy+e.sell)/2, e.up, e.tickerHtmlId)
    updateStockBuySell(e.name, e.buy, e.sell, e.up, e.owned, e.buySellHtmlId)
  })
}

function getNetWorth() {
  var value = money
  stocks.forEach(function (e,i,a) {
    value += e.owned * (e.sell)
  })
  value -= bank.loan
  return value
}

function start(){
  stocks.forEach(function (e,i,a) {
    e.tickerHtmlId = addStockToTicker(e.name, (e.buy + e.sell)/2, e.up)
    e.buySellHtmlId = addStockToBuySell(e.name, e.buy, e.sell, e.up, e.owned, i)
  })
  updateNews(latestNews)
  updateAll()
  setRandomNews()
  firstDraw()
  setInterval(setRandomNews, 1000*30)
  setInterval(updateAll, 100)
  setInterval(doMarket, 1000)
  setInterval(tickChart, 1000)
}

function setRandomNews () {
  latestNews = newsStories[Math.floor(Math.random() * newsStories.length)];
}

function repay (pc) {
  r = bank.loan * (pc/ 100)
  bank.loan -= r
  money -= r
  bank.credit += r
}

function borrow (pc) {

  b = bank.credit * (pc /100)
  bank.loan += b
  money += b
  bank.credit -= b

}


var cindex = 0
var cdata, ctx, options, chart = 0
var cdata2, ctx2, options2, chart2 = 0

function averageCost() {
  total = 0
  number = 0
  stocks.forEach(function (e,i,a) {
    total += (e.buy+e.sell)   /2
    number += 1
  })
  return total/number
}

var startingAverage = 0

function firstDraw() {
  startingAverage = Math.round(averageCost()*100)/100
  ctx = document.getElementById("chart-average").getContext("2d");

  cdata = {
    labels: [""],
    datasets: [
        {
            label: "MoneyTree 14",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [Math.round(averageCost())]
        },
        {
            label: "MoneyTree 14",
            fillColor: "rgba(220,220,220,0.1)",
            strokeColor: "rgba(220,0,0,0.7)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [startingAverage]
        },
    ]
  };
  chart = new Chart(ctx).Line(cdata, {bezierCurve: false, animationSteps:1, showXLabels: 10, pointDot:false,
                scaleStartValue: 0, responsive:true, maxHeight:100, maintainAspectRatio: false,showTooltips:false});

  ctx2 = document.getElementById("chart-networth").getContext("2d");

  cdata2 = {
    labels: [""],
    datasets: [
        {
            label: "Your Net Worth",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [getNetWorth()]
        },
        {
            label: "MoneyTree 14",
            fillColor: "rgba(220,220,220,0.1)",
            strokeColor: "rgba(220,0,0,0.7)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [100000]
        },
    ]
  };
  chart2 = new Chart(ctx2).Line(cdata2, {bezierCurve: false, animationSteps:1, showXLabels: 10, pointDot:false,
                scaleStartValue: 0, responsive:true, maxHeight:100, maintainAspectRatio: false,showTooltips:false});
}

function tickChart() {
  chart.addData([Math.round(averageCost()*100)/100,startingAverage], "")
  if (chart.datasets[0].points.length > 300) {
    chart.removeData(0)
    chart2.removeData(0)
  }
  chart2.addData([Math.round(getNetWorth()*100)/100, 100000], "")

}
