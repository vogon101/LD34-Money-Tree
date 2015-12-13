function format (number, precision) {
        if (!isFinite(number)) {
            return number.toString();
        }

        var a = number.toFixed(precision).split('');
        a.push('.');

        var i = a.indexOf('.') - 3;
        while (i > 0 && a[i-1] !== '-') {
            a.splice(i, 0, ',');
            i -= 3;
        }

        a.pop();
        return a.join('');
    };

    function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}
