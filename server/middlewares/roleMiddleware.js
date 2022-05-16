const jwt = require('jsonwebtoken')
const { SECRET } = process.env


module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({ message: "Пользователь не авторизован" })
            }
            const { role: userRole } = jwt.verify(token, SECRET)
            let hasRole = false

            roles.forEach(role => {
                if (userRole == role) {
                    hasRole = true
                }
            })

            if (!hasRole) {
                return res.status(403).json({ message: "у вас нет доступа" })
            }
            next()
        } catch (error) {
            console.log(error);
            return res.status(403).json({ message: "Пользователь не авторизован" })
        }
    }
};