const fs = require('fs');
var axios = require('axios');
console.log("Test");
// Read CSV file
const csv = fs.readFileSync('emails.csv', 'utf-8');

// Parse CSV data
const lines = csv.trim().split('\n');
const headers = lines.shift().split(',');
const emailIndex = headers.findIndex(h => h.toLowerCase() === 'email');
if (emailIndex === -1) {
    throw new Error('CSV file does not contain an "email" column');
}
const emails = lines.map(line => line.split(',')[emailIndex]);
console.log(emails);
// Log each email
for (const email of emails) {
    console.log(email);

    var data = JSON.stringify({
        "emailAddresses": [
            email
        ]
    });

    var config = {
        method: 'post',
        url: 'https://marsh.okta.com/api/v1/org/email/bounces/remove-list',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'SSWS 00Ft60-Qekzh4xw3X6Vv×750PDZ5RCCx-rVGGyHQJg'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}
