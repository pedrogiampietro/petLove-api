import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

const prisma = new PrismaClient();
const router = express.Router();
const saltRounds = 10;

router.post('/sign-up', async (request, response) => {
	const { name, email, password } = request.body;

	if (!name || !email || !password) {
		return response.status(400).json({
			error: true,
			message: 'Nome, e-mail e uma senha são obrigatórios para o cadastro.',
		});
	}

	const hashedPassword = bcrypt.hashSync(password, saltRounds);

	try {
		const createUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		return response.status(201).json({
			error: false,
			message: 'Usuário criado com sucesso.',
			data: createUser,
		});
	} catch (error) {
		console.log(error);

		return response.status(500).json({
			error: true,
			message: 'Erro ao criar o usuário.',
		});
	}
});

router.post('/sign-in', async (request, response) => {
	const { email, password } = request.body;

	try {
		const findUser = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});

		if (!findUser) {
			return response.status(404).json('Usuário não encontrado no sistema.');
		}

		const validPassword = await bcrypt.compare(password, findUser.password);

		if (!validPassword)
			return response.status(400).json('Password incorreto, tente novamente.');

		const token = generateAccessToken(findUser.id);
		const refreshToken = generateRefreshToken(findUser.id, token);

		return response.status(200).json({
			id: findUser.id,
			name: findUser.name,
			email: findUser.email,
			tokens: {
				token: token,
				refreshToken: refreshToken,
			},
		});
	} catch (err) {
		return response.status(500).json(err);
	}
});

export default router;
