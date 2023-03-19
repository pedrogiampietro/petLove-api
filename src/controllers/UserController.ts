import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

interface CreateUserInput {
	name: string;
	email: string;
	password: string;
	phone?: string;
}

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

	try {
		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				password,
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
