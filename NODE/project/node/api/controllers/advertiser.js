import Advertiser from "../models/advertiser.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto';
export const getAll = (req, res) => {
    Advertiser.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getById = (req, res) => {
    Advertiser.findById(req.params.id)
        .then(data => {
            if (!data)
                return res.status(404).send({ error: "Advertiser not found." });
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const login = (req, res) => {
    const { email, password } = req.body;
    // console.log("req.body",req.body);

    Advertiser.findOne({ email, password })
        .then(user => {
            if (!user)
                return res.status(401).send({ error: "Advertiser not found." });
            console.log(user._id);
            const token = jwt.sign(
                { id: user._id, email: user.email, phone: user.phone, phone2: user.phone2 },
                'd76FBHJ76*y87',
                {
                    expiresIn: '1hr',
                    // expiresIn: '10m',
                    // expiresIn: '7d'
                }
            )
            console.log(token);

            res.status(200).send({ user, token })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {
    const { email, password, phone, phone2 } = req.body;
    const newAdvertiser = new Advertiser({ email, password, phone, phone2 });
    newAdvertiser.save()
        .then(data => {
            // console.log(data);

            const token = jwt.sign(
                { id: data._id, email: data.email, phone: data.phone, phone2: data.phone2 },
                'd76FBHJ76*y87',
                {
                    expiresIn: '1hr',
                    // expiresIn: '10m',
                    // expiresIn: '7d'
                }
            )
            res.status(200).send({ data, token })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const update = (req, res) => {
    const { id } = req.params
    Advertiser.findByIdAndUpdate(id, req.body, { new: true })
        .then(data => {
            res.status(200).send({ message: `Advertiser ${data.id} updated successfully.` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export async function updatePass(req, res) {
    const { email, password } = req.body;

    try {
        const advertiser = await Advertiser.findOneAndUpdate(
            { email: email },
            {  password}, // 
            { new: true} // new מחזיר את המסמך המעודכן
        );

        if (!advertiser) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }
        return res.status(200).json({ message: 'Password updated successfully',advertiser });
    } catch (error) {
        return res.status(500).json({ message: `Error updating password: ${error.message}` });
    }
}


export async function resetPassword(req, res) {
    // console.log('Email:', process.env.MESSAGES_EMAIL);
    // console.log('Password:', process.env.MESSAGES_EMAIL_PASSWORD);
    const advertiserEmail = req.params.advertiserEmail
    console.log('Advertiser email:', advertiserEmail);

    const tempPassword = crypto.randomBytes(4).toString('hex'); // סיסמה אקראית באורך 8 תווים
    const expirationTime = Date.now() + 10 * 60 * 1000; // 10 דקות מהזמן הנוכחי

    // כאן תוכל לשמור את tempPassword וה-expirationTime בבסיס הנתונים שלך

    // הגדרת המייל
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // השרת SMTP שלך
        port: 465, // או 465 אם אתה משתמש ב-SSL
        secure: true, // true עבור 465, false עבור אחרים
        // service: 'gmail', // או שירות דוא"ל אחר
        auth: {
            user: process.env.MESSAGES_EMAIL,
            pass: process.env.MESSAGES_EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.MESSAGES_EMAIL,
        to: advertiserEmail,
        subject: 'איפוס סיסמה',
        // text: `סיסמתך הזמנית היא: ${tempPassword}. היא תקפה למשך 10 דקות.`,
        html: `
        <div style="text-align: right; direction: rtl;">
            <h3>מפרסם יקר!</h3>
            <h4>הקוד שלך לשינוי הסיסמה הוא:</h4>
            <h1>${tempPassword}</h1>
            <p>הסיסמה תקפה ל10 דקות בלבד</p>
        </div>
    `
    };

    // שליחת המייל
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: `Error updating password: ${error.message}` });
        } else {
            console.log('Email sent: ' + info.response);
            const token = jwt.sign(
                { advertiserEmail, tempPassword },
                'd76FBHJ76*y87',
                {
                    expiresIn: '1000000000000000000000000000hr',
                    // expiresIn: '10m',
                    // expiresIn: '7d'
                }
            )
            console.log("token",token)

            return res.status(200).send({ token,advertiserEmail,tempPassword });
        }
    });
}






