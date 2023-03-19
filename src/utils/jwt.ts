import jwt from 'jsonwebtoken'

function generateAccessToken(userId: string) {
	return jwt.sign({ userId: userId }, process.env.JWT_ACCESS_SECRET as any, {
		expiresIn: '5m',
	})
}

function generateRefreshToken(userId: string, jti: string) {
	return jwt.sign(
		{
			userId: userId,
			jti,
		},
		process.env.JWT_REFRESH_SECRET as any,
		{
			expiresIn: '8h',
		}
	)
}

function generateTokens(user: string, jti: string) {
	const accessToken = generateAccessToken(user)
	const refreshToken = generateRefreshToken(user, jti)

	return {
		accessToken,
		refreshToken,
	}
}

function verifyToken(token: string) {
	return jwt.verify(token, process.env.JWT_ACESS_SECRET as any)
}

function getTokenFromHeaders(headers: any) {
	const token = headers['authorization']
	return token ? token.slice(7, token.length) : null
}

export {
	generateAccessToken,
	generateRefreshToken,
	generateTokens,
	verifyToken,
	getTokenFromHeaders,
}
