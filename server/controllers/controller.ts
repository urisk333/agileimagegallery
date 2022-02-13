import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controllers for a manually populating the database with the necessary data by using Postman

const addUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await prisma.user.create({
      data: req.body
    });
		res.status(201);
		res.send(user);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await prisma.user.findMany();    
		res.status(200);
		res.send(user);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const addImage = async (req: Request, res: Response): Promise<void> => {
	try {
		const { name, image, description, userId } = req.body;
		const newImage = await prisma.image.create({
			data: {
						name: name,
						image: image,
						description: description,
						userId: userId				
			}		
		});
		res.status(201);
		res.send(newImage);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const getImages = async (req: Request, res: Response): Promise<void> => {
	try {
		const images = await prisma.image.findMany();
		res.status(200);
		res.send(images);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const getOneImage = async (req: Request, res: Response): Promise<void> => {
	try {
		const id = +req.params.id;
		const image = await prisma.image.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				name: true,	
        image: true,
        description: true,
        userId: true	
			}
		});
		res.status(200);
		res.send(image);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const addComment = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.body;
		const trip = await prisma.comment.create({
			data: req.body
		});
		res.status(201);
		res.send(trip);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const getComments = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await prisma.comment.findMany();
		res.status(200);
		res.send(user);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const updateComment = async (req: Request, res: Response): Promise<void> => {
	try {
		const id = +req.params.id;
		const trip = await prisma.comment.update({
			data: req.body,
			where: {
				id: id
			}
		});
		res.status(200);
		res.send(trip);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const deleteComment = async (req: Request, res: Response): Promise<void> => {
	try {
		const id = +req.params.id;
		await prisma.comment.delete({
			where: {
				id: id
			}
		});
		res.sendStatus(204);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const controller = {
	addUser,
  getUsers,
  addImage,
  getImages,
	getOneImage,
  addComment,
  getComments,
  updateComment,
  deleteComment
};

export default controller;
