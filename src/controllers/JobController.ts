import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const jobOffers = await prisma.jobOffer.findMany({
			include: { animal: true },
		});
		res.json(jobOffers);
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Erro ao buscar ofertas de trabalho.', error: err });
	}
});

router.post('/', async (req, res) => {
	const {
		animalId,
		offerType,
		pricePerHour,
		pricePerDay,
		location,
		availabilities,
	} = req.body;

	if (!animalId || !offerType) {
		return res.status(400).json({
			error: true,
			message: 'animalId e offerType são obrigatórios',
		});
	}

	if (
		(offerType === 'WALKKING' && !pricePerHour) ||
		(offerType === 'DAYCARE' && !pricePerDay)
	) {
		return res.status(400).json({
			error: true,
			message: 'O preço deve ser informado de acordo com o tipo de oferta.',
		});
	}

	try {
		const jobOffer = await prisma.jobOffer.create({
			data: {
				animalId,
				offerType,
				location,
				pricePerHour,
				pricePerDay,
				availability: {
					create: availabilities,
				},
			},
			include: { animal: true, availability: true },
		});

		res.json(jobOffer);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ message: 'Erro ao criar oferta de trabalho.', error: err });
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const jobOffer = await prisma.jobOffer.findUnique({
			where: { id },
			include: { animal: true },
		});
		if (!jobOffer) {
			return res
				.status(404)
				.json({ message: 'Oferta de trabalho não encontrada.' });
		}
		res.json(jobOffer);
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Erro ao buscar oferta de trabalho.', error: err });
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { animalId, offerType, pricePerHour, pricePerDay, location } = req.body;

	try {
		const jobOffer = await prisma.jobOffer.update({
			where: { id },
			data: {
				animalId,
				location,
				offerType,
				pricePerHour,
				pricePerDay,
			},
			include: { animal: true },
		});
		if (!jobOffer) {
			return res
				.status(404)
				.json({ message: 'Oferta de trabalho não encontrada.' });
		}
		res.json(jobOffer);
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Erro ao atualizar oferta de trabalho.', error: err });
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const jobOffer = await prisma.jobOffer.delete({
			where: { id },
		});
		if (!jobOffer) {
			return res
				.status(404)
				.json({ message: 'Oferta de trabalho não encontrada.' });
		}
		res.json({ message: 'Oferta de trabalho excluída com sucesso.' });
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Erro ao excluir oferta de trabalho.', error: err });
	}
});

export default router;
