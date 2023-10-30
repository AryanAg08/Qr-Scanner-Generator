$(document).ready(function () {
    $.ajax({
      url: "https://ticker-validator-2a31f8f74db7.herokuapp.com/user/admin-data", // Replace with  MongoDB server endpoint
      type: "GET",
      success: function (data) {
        $.each(data, function (index, value) {
          var row = $("<tr><td>" + value.Name + "</td><td>" + value.Enroll + "</td><td>" + value.QRUsed + "</td><td>"+ value.MailID + "</td><td>" + value.Mobile +  "</td><td>" + value.Paid + "</td></tr>");
          row.addClass("fade-in");
          $("#data").append(row);
        });
      },
      error: function () {
        alert("Error retrieving data.");
      },
    });
  });
