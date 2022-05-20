fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Food')
    .then(response=> response.json())
    .then(data=> console.log(data))