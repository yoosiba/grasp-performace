 Event.observe(document, 'dom:loaded', function() {

    // prettyPrint();

    HumbleFinance.trackFormatter = function (obj) {
        var x = Math.floor(obj.x);
        var textBuilder = [labelData[0], ":", timeData[x][1], ", ", labelData[1], ":", customData[x][1], ", ", labelData[2], ":", nativeData[x][1], ", ", labelData[3], ":", magnitudeData[x][1]];
        return textBuilder.join("");
    };

    /*
     * Format scale labels on (left) vertical axis.
     */
    HumbleFinance.yTickFormatter = function (n) {

        if (n == this.axes.y.max) {
            return false;
        }

        return n + '[s]';
    };

    /*
     * Format scale labels on (bottom) horizontal axis.
     */
    HumbleFinance.xTickFormatter = function (n) {

        if (n == 0) {
            return false;
        }

        var date = timeData[n][1];
//         date = date.substring(0, 4);
        return date;
    }

    HumbleFinance.init('graph', customData, nativeData, magnitudeData, summaryData, labelData);
    HumbleFinance.setFlags(flagData);

    var xaxis = HumbleFinance.graphs.summary.axes.x;
    var prevSelection = HumbleFinance.graphs.summary.prevSelection;
    var xmin = xaxis.p2d(prevSelection.first.x);
    var xmax = xaxis.p2d(prevSelection.second.x);

    $('dateRange').update(timeData[xmin][1] + ' - ' + timeData[xmax][1]);

    Event.observe(HumbleFinance.containers.summary, 'flotr:select', function (e) {

        var area = e.memo[0];
        xmin = Math.floor(area.x1);
        xmax = Math.ceil(area.x2);
        $('dateRange').update(timeData[xmin][1] + ' - ' + timeData[xmax][1]);
    });
});
