
const scanner = new Html5QrcodeScanner('reader', { 
    // Scanner will be initialized in DOM inside element with id of 'reader'
    qrbox: {
        width: 200,
        height: 200,
    },  // Sets dimensions of scanning box (set relative to reader element width)
    fps: 20, // Frames per second to attempt a scan
});


scanner.render(success, error);


async function success(result) {
    document.getElementById('result').style.visibility = "visible"
    document.getElementById('btn').style.display = "block"

    const Success = `
    <h2>Success</h2>
    `;
    const Error = `
    <h2>Error</h2>
    `;

    // const data = {
    //     Enroll: result
    // }
      
    //     sendDataToServer(data);
     const Email = result

    fetch("/user/submit-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Email })
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
          if (data.user === result ) {
            alert("Success");
          }
           else if (data.user === null){
            alert("Error!");
         }
      })
      .catch((err) => console.error(err));
            
    
   
    console.log(result);
    scanner.clear();
   
}

function error(err) {
    console.error(err);
    // Prints any errors to the console
}


document.getElementById("btn").addEventListener('click',reload)

function reload(){
    window.location.reload()
}

//}

// function sendDataToServer(data) {
//     const xhr = new XMLHttpRequest();
  
//     xhr.onreadystatechange = function() {
//       if (this.readyState === 4 && this.status === 200) {
//         console.log(this.responseText); // handle the server response
//       }
//     };
  
//     xhr.open('POST', 'submit-data');
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify(data));
//   }
