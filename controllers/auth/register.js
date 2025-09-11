import User from "../../models/user.js";

async function handleRegister(req, res, db, bcrypt) {
   const {email, login, password, password_confirm, name} = req.body;
   const saltRounds = 10;
   const moduleUser = new User(db);
    try{
        if(password != password_confirm){
            res.status(500).json({ error: 'passwords must match' });
        }
        const hash = await bcrypt.hash(password, saltRounds);
        
        const user_id = await moduleUser.create_user(login, hash, name, email);

        const newUser = await db('users').where({ users_id: user_id  }).first();
        res.json(newUser);

        //mail confirmation
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ptovstonoh@gmail.com',
            pass: process.env.MAIL_PASS,
        }
    });

    const mailOptions = {
        from: 'ptovstonoh@gmail.com',
        to: 'ptovstonoh@gmail.com',
        subject: 'email adress confirmation',
        text: 'Please confirm the email adress via link'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
};

export default handleRegister;