const express = require('express');
const argon2 = require('argon2');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));

app.use(cors({ origin: true, credentials: true }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: "Too many requests, slow down."
});
app.use(limiter);

function authCheck(req, res, next) {
    const vendor = req.cookies.vendor_auth;
    if (!vendor) {
        console.error("Unauthorized access attempt");
        return res.status(401).json({ error: "Unauthorized. Login required." });
    }
    req.vendorName = vendor;
    next();
}

app.post('/vendor-login', async (req, res) => {
    try {
        let { vendorName, password } = req.body;

        if (!vendorName || !password) {
            return res.status(400).json({ error: "vendorName and password are required" });
        }

        vendorName = vendorName.trim();

        const hash = await argon2.hash(password);
        console.log("Hashed Password:", hash);

        res.cookie("vendor_auth", vendorName, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            secure: false 
        });

        res.json({
            message: "Login successful",
            vendor: vendorName
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/dashboard', authCheck, (req, res) => {
    res.json({
        message: `Welcome to your secure dashboard, ${req.vendorName}!`
    });
});

app.listen(3000, () => console.log("Secure Vendor Panel running on port 3000"));
