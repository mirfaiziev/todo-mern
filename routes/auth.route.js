const { Router } = require('express');
const User = require('../model/User')
const bcryptjs = require('bcryptjs')
const config = require('config');
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const router = Router();

// api/auth/register
router.post(
    '/register',
    [
        check('email', 'incorrectEmail').isEmail(),
        check('password', 'incorrectPassword min 6 symbols').isLength({min:6})
    ],
    async (request, response) => {
        try {
            const errors = validationResult(req);
            if (!empty(errors)) {
                response.status(400).json({
                    errors: errors.array(),
                    message: "incorrect data"
                })
            }
            const { email, password } = req.body;

            const candidate = await User.findOne({ email })
            if (candidate) {
                return response.status(400).json({ message: 'Such email already exists' })
            }

            const hassedPasswod = await bcryptjs.hash(password, config.get('salt'))
            const user = new User({ email, password: hassedPasswod })
            await user.save()

            response.status(201).json({ message: 'User successfully created' })


        } catch (e) {
            response.status(500).json({ message: "Something went wrong" });
        }
    });

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'incorrectEmail').normalizeEmail().isEmail(),
        check('password', 'incorrectPassword min 6 symbols').isLength({min:6})
    ],
    async (request, response) => {
        try {
            const errors = validationResult(req);
            if (!empty(errors)) {
                response.status(400).json({
                    errors: errors.array(),
                    message: "incorrect data"
                })
            }
            const { email, password } = req.body;

            const user = await User.findOne({ email })
            if (!user) {
                return response.status(400).json({ message: 'No such user' })
            }

            const isMatch = await bcryptjs.compare(password, user.password)
            if (!isMatch){
                return response.status(400).json({ message: 'Incorrect password' })
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            );

            response.status(201).json({token, userId: user.id})


        } catch (e) {
            response.status(500).json({ message: "Something went wrong" });
        }
    });

module.exports = router;