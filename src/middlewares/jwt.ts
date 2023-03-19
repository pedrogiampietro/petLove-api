// import { Request, Response, NextFunction } from 'express'
// import { verifyToken, getTokenFromHeaders } from '../utils/jwt'

// async function checkJwt(req: Request, res: Response, next: NextFunction) {
// 	const _accessToken = req.headers['x-access-token'] as string
// 	console.log(_accessToken)
// 	if (!_accessToken) {
// 		console.log('error 1')
// 		res.status(401).json({ message: 'no access token found' })
// 	}
// 	const { valid, decoded, expired } = verifyToken(
// 		_accessToken,
// 		'accessTokenPrivateKey'
// 	)

// 	if (!decoded) {
// 		console.log('error 2')
// 		res.status(401).json({ message: 'token expired' })
// 	}
// 	res.locals.user = decoded
// 	next()
// }

// export { checkJwt }
