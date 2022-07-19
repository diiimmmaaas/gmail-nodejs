const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3010;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    requireTLS: true,
    auth: {
        user: "dimonbich94@gmail.com", // generated ethereal user
        pass: "jofukbopdtsiswuo", // generated ethereal password
    },
});


app.get("/", async (req, res) => {
    res.send("Hello World!!!!!");
});

app.post("/sendMessage", async (req, res) => {

    let {email, name, text} = req.body;

    let info = await transporter.sendMail({
        from: "HR WANTS ME", // sender address
        to: "dimonbich94@gmail.com", // list of receivers
        subject: "HR WANTS ME", // Subject line
        html: `<b>Сообщение с portfolio page</b>
        <div>
            message: ${text}
        </div>
        <div>
            name: ${name}
        </div>
        <div>
            email: ${email}
        </div>`
    });

    // res.send("Okay");
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});