export  function formatToTime(date) {
    let unix_timestamp = date;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    var day = date.getDay();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ":" + minutes.substr(-2);
    return formattedTime;
  }

  export  function formatToDate(date_value) {
    let unix_timestamp = date_value;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dayofMonth = date.getDate();
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let getDate = dayofMonth + " " + months[month] + " " + year;
    return getDate;
  }

 export  function formatToDay(date_value) {
    let unix_timestamp = date;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(date_value);
    var day = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const get_day = days[day];
    return get_day;
  }

  export  function formatDate(date_value) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(date_value);
    let month = date.getMonth() + 1;
    let dayofMonth = date.getDate();
    let year = date.getFullYear();
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let getDate = dayofMonth + " " + months[month] + " " + year;
    return getDate;
  }

