function sendJSON() {

    let result = document.querySelector('.result');
    let name = document.querySelector('#name');
    let email = document.querySelector('#email');

    // Creating a XHR object 
    let xhr = new XMLHttpRequest();

    let url = "http://localhost:9000/check";

    // open a connection 
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback 
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server 
            var jsonObj = JSON.parse(this.responseText)
            result.innerHTML = jsonObj['message'];
            alert(jsonObj['status'] )
            if (jsonObj['status'] == 'In time') {
                result.style.backgroundColor = "green";
            } else if (jsonObj['status'] == 'Delayed') {
                result.style.backgroundColor = "red";
            } else {
                result.style.backgroundColor = "black";
            }

            result.style.display = "block";

        }
    };

    // Converting JSON data to string 
    // var data = JSON.stringify({ "name": name.value, "email": email.value }); 
    alert(destination.value + date.value + time.value);
    let data = {
        "DEP_HOUR_0.0": 0,
        "DEP_HOUR_1.0": 0,
        "DEP_HOUR_5.0": 0,
        "DEP_HOUR_6.0": 0,
        "DEP_HOUR_7.0": 0,
        "DEP_HOUR_8.0": 0,
        "DEP_HOUR_9.0": 0,
        "DEP_HOUR_10.0": 0,
        "DEP_HOUR_11.0": 0,
        "DEP_HOUR_12.0": 0,
        "DEP_HOUR_13.0": 0,
        "DEP_HOUR_14.0": 0,
        "DEP_HOUR_15.0": 0,
        "DEP_HOUR_16.0": 0,
        "DEP_HOUR_17.0": 0,
        "DEP_HOUR_18.0": 0,
        "DEP_HOUR_19.0": 0,
        "DEP_HOUR_20.0": 0,
        "DEP_HOUR_21.0": 0,
        "DEP_HOUR_22.0": 0,
        "DEP_HOUR_23.0": 0,
        "Month_1": 0,
        "Month_2": 0,
        "Month_3": 0,
        "Month_4": 0,
        "Month_5": 0,
        "Month_6": 0,
        "Month_7": 0,
        "Month_8": 0,
        "Month_9": 0,
        "Month_10": 0,
        "Month_11": 0,
        "Month_12": 0,
        "DayOfWeek_1": 0,
        "DayOfWeek_2": 0,
        "DayOfWeek_3": 0,
        "DayOfWeek_4": 0,
        "DayOfWeek_5": 0,
        "DayOfWeek_6": 0,
        "DayOfWeek_7": 0,
        "DayofMonth_1": 0,
        "DayofMonth_2": 0,
        "DayofMonth_3": 0,
        "DayofMonth_4": 0,
        "DayofMonth_5": 0,
        "DayofMonth_6": 0,
        "DayofMonth_7": 0,
        "DayofMonth_8": 0,
        "DayofMonth_9": 0,
        "DayofMonth_10": 0,
        "DayofMonth_11": 0,
        "DayofMonth_12": 0,
        "DayofMonth_13": 0,
        "DayofMonth_14": 0,
        "DayofMonth_15": 0,
        "DayofMonth_16": 0,
        "DayofMonth_17": 0,
        "DayofMonth_18": 0,
        "DayofMonth_19": 0,
        "DayofMonth_20": 0,
        "DayofMonth_21": 0,
        "DayofMonth_22": 0,
        "DayofMonth_23": 0,
        "DayofMonth_24": 0,
        "DayofMonth_25": 0,
        "DayofMonth_26": 0,
        "DayofMonth_27": 0,
        "DayofMonth_28": 0,
        "DayofMonth_29": 0,
        "DayofMonth_30": 0,
        "DayofMonth_31": 0,
        "Dest_CLT": 0,
        "Dest_DFW": 0,
        "Dest_JFK": 0,
        "Dest_LAX": 0,
        "Dest_MIA": 0,
        "Dest_ORD": 0,
        "Dest_PHL": 0,
        "Dest_PHX": 0,
        "DistanceGroup_2": 0,
        "DistanceGroup_3": 0,
        "DistanceGroup_6": 0,
        "DistanceGroup_8": 0,
        "DistanceGroup_10": 0,
        "DistanceGroup_11": 0,
        "Reporting_Airline_AA": 1
    };
    // PHX 2020-12-25 23:31
    var d = new Date(date.value);
    var t = new Date(time.value);

    let distGroup = ""
    if (destination.value = "CLT") {
        distGroup = "10"
    } else if (destination.value = "DFW") {
        distGroup = "6"
    } else if (destination.value = "JFK") {
        distGroup = "11"
    } else if (destination.value = "LAX") {
        distGroup = "2"
    } else if (destination.value = "MIA") {
        distGroup = "11"
    } else if (destination.value = "ORD") {
        distGroup = "8"
    } else if (destination.value = "PHL") {
        distGroup = "11"
    } else if (destination.value = "PHX") {
        distGroup = "3"
    } else {
        ""
    }


    for (var [key, value] of Object.entries(data)) {

        if (key = `Dest_${destination.value}`) {
            data[key] = 1;
        };
        if (key = `DayofMonth_${d.getDate()}`) {
            data[key] = 1;
        };
        if (key = `DayOfWeek_${d.getDay()}`) {
            data[key] = 1;
        };
        if (key = `Month_${d.getMonth() + 1}`) {
            data[key] = 1;
        };
        if (key = `DEP_HOUR_${time.value.substring(0, 2).replace(/^0/, '').replace(/^2|^3|^4/, '1')}.0`) {
            data[key] = 1;
        };
        if (key = `DistanceGroup_${distGroup}`) {
            data[key] = 1;
        };
        console.log(`${key}: ${value}`);
    }

    alert(JSON.stringify(data));
    data = JSON.stringify(data)
    $('#myForm')[0].reset();
    // Sending data with the request 
    xhr.send(data);
} 