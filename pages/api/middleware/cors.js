// middleware/cors.js
export default function initMiddleware(req, res) {
    return new Promise((resolve, reject) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return resolve(true);
        }
        return resolve(false);
    });
}