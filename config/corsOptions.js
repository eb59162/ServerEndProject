const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8000'
]
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }
        else {
            callback(new Error('NOT ALLOWED BY CORS'))
        }
    },
    Credentials: true,
    optionSuccessStatus: 200
}
module.exports=corsOptions