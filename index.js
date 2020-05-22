const path = require('path')
const nodeMailer = require('nodemailer')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req,res){
    /**
     * Home screen.
     */
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/send-email', function (req, res) { //TODO FINISH THIS
    /**
     * POST Endpoint for sending email via Contact Me form.
     * Redirects back to home page upon sending.
     */
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });
    let mailOptions = {
        to: 'brandon.kwintner@gmail.com',
        subject: req.body.name + " - Message From Personal Website",
        text: req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.redirect('/')
});

app.listen(process.env.PORT, function() {
    console.log('\nListening on port:', process.env.PORT, '\n');
});