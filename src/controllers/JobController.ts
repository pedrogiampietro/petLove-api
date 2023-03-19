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
	const { name, animalId, offerType, pricePerHour, pricePerDay } = req.body;

	if (!name || !animalId || !offerType) {
		return res.status(400).json({
			error: true,
			message: 'Nome, animalId e tipo de oferta são obrigatórios.',
		});
	}

	if (
		(offerType === 'WALKING' && !pricePerHour) ||
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
				name,
				animalId,
				offerType,
				pricePerHour: offerType === 'WALKING' ? pricePerHour : null,
				pricePerDay: offerType === 'DAYCARE' ? pricePerDay : null,
			},
			include: { animal: true },
		});
		res.json(jobOffer);
	} catch (err) {
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
	const { name, animalId, offerType, pricePerHour, pricePerDay } = req.body;

	try {
		const jobOffer = await prisma.jobOffer.update({
			where: { id },
			data: {
				name,
				animalId,
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
