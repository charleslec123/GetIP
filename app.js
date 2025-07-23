const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Optional: Store IPs in a JSON file
const IP_FILE = 'ips.json';

// Helper: Load existing IPs
function loadIPs() {
    if (fs.existsSync(IP_FILE)) {
        return JSON.parse(fs.readFileSync(IP_FILE));
    }
    return [];
}

// Helper: Save IPs
function saveIPs(ips) {
    fs.writeFileSync(IP_FILE, JSON.stringify(ips, null, 2));
}

app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let ips = loadIPs();
    if (!ips.includes(ip)) {
        ips.push(ip);
        saveIPs(ips);
        console.log(`New visitor IP recorded: ${ip}`);
    }
    res.send('你被骗了 : )');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});