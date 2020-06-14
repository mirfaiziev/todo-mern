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
        check('email', 'Incorrect email format').isEmail(),
        check('password', 'Incorrect password min 6 symbols').isLength({min:6})
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: "Validation failed"
                })
            }
            const { email, password } = request.body;

            const candidate = await User.findOne({ email })
            if (candidate) {
                return response.status(400).json({ message: 'Such email already exists' })
            }

            const hashedPassword = await bcryptjs.hash(password, config.get('salt'))
            const user = new User({ email, password: hashedPassword })
            await user.save()

            response.status(201).json({ message: 'User successfully created' })


        } catch (e) {
            response.status(500).json({ message: "Something went wrong:"+ e.message });
        }
    });

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Incorrect email format').normalizeEmail().isEmail(),
        check('password', 'Incorrect password min 6 symbols').isLength({min:6})
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
               return response.status(400).json({
                    errors: errors.array(),
                    message: "Validation failed"
                })
            }
            const { email, password } = request.body;

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
