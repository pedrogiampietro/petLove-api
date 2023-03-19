import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const router = express.Router();
const saltRounds = 10;

interface UpdateUserInput {
	name?: string;
	email?: string;
	password?: string;
	phone?: string;
}

router.get('/', async (req, res) => {
	try {
		const users = await prisma.user.findMany();

		return res.json({
			error: false,
			data: users,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				Animal: true,
			},
		});

		if (!user) {
			return res.status(404).json({
				error: true,
				message: 'User not found',
			});
		}

		return res.json({
			error: false,
			data: user,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { name, email, password, phone }: UpdateUserInput = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({
			error: true,
			message:
				'Nome, e-mail e senha são obrigatórios para atualizar o usuário.',
		});
	}

	const findUser = await prisma.user.findFirst({
		where: {
			email: email,
		},
	});

	if (!findUser) {
		return res
			.status(404)
			.json({ message: 'Usuário não encontrado no sistema.' });
	}

	const hashedPassword = bcrypt.hashSync(password, saltRounds);

	try {
		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				password: hashedPassword,
				phone,
			},
		});

		return res.json({
			error: false,
			message: 'User updated successfully',
			data: user,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		await prisma.user.delete({
			where: {
				id,
			},
		});

		return res.json({
			error: false,
			message: 'User deleted successfully',
		});
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Erro ao excluir oferta de trabalho.', error: err });
	}
});

export default router;
