const cloudinary = require('cloudinary').v2;
const User = require('../Model/User');
const formidable = require('formidable');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

exports.signup = (req, res) => {
    const form = new formidable.IncomingForm();

    try {
        form.parse(req, async (err, fields, files) => {
            if(err) {
                console.log(err);
                return res.status.json({ msg: 'Error made' })
            }

            const { username, email, password, department, yearPassOut, linkedin } = fields;
            const { image } = files;

            
            if (!username || !password || !image || !email || !department || !yearPassOut) {
                return res.status(400).json({ msg: 'All fields are required' });
            }
            if(password.length < 6) {
                return res.status(400).json({ msg: 'Password length has to be 6 character' });
            }

            await User.findOne({ email: email, username: username })
                .then(async user => {
                    if(user) return res.status(400).json({msg: 'User already Available'});

                    cloudinary.uploader.upload(image.path, { folder: `/Questiva/profileimage/${username}`, width: 100, crop: 'scale' }, async (err, result) => {
                        if(err) {
                            console.log(err);
                            return res.status(500).json({ msg: 'Image upload error: check your image file type' });
                        }

                        const url = result.secure_url;
                        const _password = await bcrypt.hash(password, 10)

                        const newUser = new User({ 
                            username: username,
                            password: _password,
                            profileImage: url,
                            email: email,
                            department: department,
                            yearPassOut: yearPassOut,
                            linkedin: linkedin 
                        })

                        await newUser.save()
                            .then(() => res.status(201).json({msg: 'User added'}))
                            .catch((errors) => res.status(500).json({ msg: errors }))
                    })

                })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Server Down' })
    }
}

exports.signin = (req, res) => {
    const form = new formidable.IncomingForm();

    try {
        form.parse(req, async (err, fields, files) => {
            if(err) {
                console.log(err);
                return res.status(400).json({ msg: 'Error made' })
            }

            const { username, password } = fields;
            
            if (!username || !password) {
                return res.status(400).json({ msg: 'All fields are required' });
            }

            await User.findOne({ username: username })
                .then(async user => {
                    if(!user) return res.status(404).json({msg: 'User not found'});

                    const isMatch = await bcrypt.compare(password, user.password);
                    if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});

                    const token = await user.generateAuthToken();

                    res.cookie('token', token, {
                        expires: new Date(Date.now() + 25892000000),
                        httpOnly: true
                    })

                    return res.status(201).json({
                        token, user
                    })

                })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Server Down' })
    }
}

exports.isSignedIn = async (req, res) => {
    const token = req.cookies.token || null;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    await User.findOne({ _id: verifyToken._id, 'tokens.token': token })
            .then(user => {
                if(user) return res.status(200).json({ authStatus: true, profileImage: user.profileImage, username: user.username});

                return res.status(200).json({ authStatus: false });
            })
            .catch(err => console.error(err))
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.status(201).json({ msg : "Logout Successfully" });
}

exports.getAllUsers = async (req, res) => {
    try {
        const data = await User.find();
        console.log(data);
        return res.status(200).json(data);

    } catch (err) {
        return res.status(501).json({ msg: 'Server currently down please try again later' });
    }
}