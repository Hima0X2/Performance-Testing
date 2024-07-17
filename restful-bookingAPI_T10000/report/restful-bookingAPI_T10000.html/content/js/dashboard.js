/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 3.5325, "KoPercent": 96.4675};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [1.125E-4, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Token"], "isController": false}, {"data": [0.0, 500, 1500, "CreateBooking"], "isController": false}, {"data": [4.5E-4, 500, 1500, "Getbooking info"], "isController": false}, {"data": [0.0, 500, 1500, "Update"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 40000, 38587, 96.4675, 27197.84142499979, 0, 268344, 322.5, 51835.90000000006, 92999.55, 101485.97, 106.23774945951544, 446.19149287941485, 4.9107699389996124], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Token", 10000, 9693, 96.93, 85297.65949999957, 4486, 103927, 84474.0, 94630.0, 100470.95, 102879.91, 96.12149757293218, 272.70508985858123, 0.7896043098476474], "isController": false}, {"data": ["CreateBooking", 10000, 9891, 98.91, 7791.553600000031, 0, 268321, 7194.5, 15326.699999999999, 17028.54999999999, 59246.99, 26.9860374242367, 64.89820223656905, 0.13643761030542798], "isController": false}, {"data": ["Getbooking info", 10000, 9005, 90.05, 7022.174399999998, 0, 268328, 1.0, 34977.799999999996, 58497.39999999999, 88801.72999999995, 28.990549080999592, 282.11179786249056, 0.547658084558184], "isController": false}, {"data": ["Update", 10000, 9998, 99.98, 8679.978199999992, 0, 268344, 16.0, 24813.499999999985, 41394.14999999996, 131260.50999999975, 32.81195142518711, 59.93437135479727, 5.011564162130415], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: An established connection was aborted by the software in your host machine", 1773, 4.594811724155804, 4.4325], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 4, 0.010366185502889574, 0.01], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to restful-booker.herokuapp.com:443 [restful-booker.herokuapp.com/107.22.57.98, restful-booker.herokuapp.com/3.209.172.72, restful-booker.herokuapp.com/54.243.238.66, restful-booker.herokuapp.com/23.22.130.173] failed: Connection timed out: connect", 8115, 21.030398838987225, 20.2875], "isController": false}, {"data": ["Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: No such host is known (restful-booker.herokuapp.com)", 1, 0.0025915463757223934, 0.0025], "isController": false}, {"data": ["403/Forbidden", 21, 0.05442247389017026, 0.0525], "isController": false}, {"data": ["404/Not Found", 3474, 9.003032109259594, 8.685], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Software caused connection abort: connect", 6101, 15.811024438282322, 15.2525], "isController": false}, {"data": ["Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: restful-booker.herokuapp.com", 123, 0.3187602042138544, 0.3075], "isController": false}, {"data": ["Non HTTP response code: java.net.NoRouteToHostException/Non HTTP response message: No route to host: connect", 4406, 11.418353331432867, 11.015], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 62, 0.1606758752947884, 0.155], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Network is unreachable: connect", 14454, 37.458211314691475, 36.135], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 52, 0.13476041153756446, 0.13], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond", 1, 0.0025915463757223934, 0.0025], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 40000, 38587, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Network is unreachable: connect", 14454, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to restful-booker.herokuapp.com:443 [restful-booker.herokuapp.com/107.22.57.98, restful-booker.herokuapp.com/3.209.172.72, restful-booker.herokuapp.com/54.243.238.66, restful-booker.herokuapp.com/23.22.130.173] failed: Connection timed out: connect", 8115, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Software caused connection abort: connect", 6101, "Non HTTP response code: java.net.NoRouteToHostException/Non HTTP response message: No route to host: connect", 4406, "404/Not Found", 3474], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Token", 10000, 9693, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to restful-booker.herokuapp.com:443 [restful-booker.herokuapp.com/107.22.57.98, restful-booker.herokuapp.com/3.209.172.72, restful-booker.herokuapp.com/54.243.238.66, restful-booker.herokuapp.com/23.22.130.173] failed: Connection timed out: connect", 8111, "Non HTTP response code: java.net.SocketException/Non HTTP response message: An established connection was aborted by the software in your host machine", 1508, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 54, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 18, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 1], "isController": false}, {"data": ["CreateBooking", 10000, 9891, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Software caused connection abort: connect", 6057, "Non HTTP response code: java.net.NoRouteToHostException/Non HTTP response message: No route to host: connect", 2061, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Network is unreachable: connect", 1597, "Non HTTP response code: java.net.SocketException/Non HTTP response message: An established connection was aborted by the software in your host machine", 141, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: restful-booker.herokuapp.com", 30], "isController": false}, {"data": ["Getbooking info", 10000, 9005, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Network is unreachable: connect", 7379, "Non HTTP response code: java.net.NoRouteToHostException/Non HTTP response message: No route to host: connect", 1475, "Non HTTP response code: java.net.SocketException/Non HTTP response message: An established connection was aborted by the software in your host machine", 66, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: restful-booker.herokuapp.com", 44, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Software caused connection abort: connect", 33], "isController": false}, {"data": ["Update", 10000, 9998, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Network is unreachable: connect", 5478, "404/Not Found", 3474, "Non HTTP response code: java.net.NoRouteToHostException/Non HTTP response message: No route to host: connect", 870, "Non HTTP response code: java.net.SocketException/Non HTTP response message: An established connection was aborted by the software in your host machine", 58, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: restful-booker.herokuapp.com", 49], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
