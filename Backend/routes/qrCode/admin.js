$(document).ready(function () {
    $.ajax({
      url: "http://localhost:5001/user/admin-data", // Replace with your MongoDB server endpoint
      type: "GET",
      success: function (data) {
        $.each(data, function (index, value) {
          var row = $("<tr><td>" + value.Name + "</td><td>" + value.Enroll + "</td><td>" + value.QRUsed + "</td><td>"+ value.Mail + "</td><td>" + value.Mobile +  "</td><td>" + value.PaidRS + "</td></tr>");
          row.addClass("fade-in"); // Add fade-in animation class
          $("#data").append(row);
        });
      },
      error: function () {
        alert("Error retrieving data.");
      },
    });
  });