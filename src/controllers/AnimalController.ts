import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const animals = await prisma.animal.findMany({
			include: {
				owner: true,
				jobOffers: true,
			},
		});
		res.status(200).json(animals);
	} catch (error) {
		res.status(500).json({ error: 'Error retrieving animals' });
	}
});

router.post('/', async (req, res) => {
	try {
		const { name, age, size, breed, sex, color, image, ownerId } = req.body;
		const animal = await prisma.animal.create({
			data: {
				name,
				age,
				size,
				breed,
				sex,
				color,
				image,
				ownerId,
			},
		});
		res.status(201).json(animal);
	} catch (error) {
		res.status(500).json({ error: 'Error creating animal' });
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const animal = await prisma.animal.findUnique({
			where: { id },
			include: {
				owner: true,
				jobOffers: true,
			},
		});
		res.status(200).json(animal);
	} catch (error) {
		res.status(500).json({ error: 'Error retrieving animal' });
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { name, age, size, breed, sex, color, image } = req.body;
	try {
		const updatedAnimal = await prisma.animal.update({
			where: { id },
			data: {
				name,
				age,
				size,
				breed,
				sex,
				color,
				image,
			},
		});
		res.status(200).json(updatedAnimal);
	} catch (error) {
		res.status(500).json({ error: 'Error updating animal' });
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const deletedAnimal = await prisma.animal.delete({ where: { id } });
		res.status(200).json(deletedAnimal);
	} catch (error) {
		res.status(500).json({ error: 'Error deleting animal' });
	}
});

export default router;
