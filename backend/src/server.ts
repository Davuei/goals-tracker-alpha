import Fastify from "fastify"
import { PrismaClient } from "./generated/prisma/client";
import cors from '@fastify/cors'
import { compare, hash } from "bcryptjs";
import 'dotenv/config'; 
import jwt from '@fastify/jwt'
import { env } from "process";
import { authenticateToken } from "../middlewares/authenticate-token";

const app = Fastify();
const prisma = new PrismaClient();

app.register(jwt, {
  secret: process.env.JWT_KEY as string
})

// PALIATIVO PARA DESENVOLVIMENTO
app.register(cors)

/*

  USERS CONTROLLER

*/

// Função para retornar todos os usuários
/* app.get('/users', async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}); */

// Função para criar um novo usuário
app.post('/users', async (req, res) => {
  try {
    const { email, name, password } = req.body as any;

    const checkEmail = await prisma.user.findUnique({ 
      where: {
        email: email
      }
    });

    if(checkEmail) 
      return res.status(400).send({ message: 'Este e-mail já está em uso.' });
  
    const passwordHash = await hash(password, 6);

    await prisma.user.create({
      data: {
        email: email, 
        name: name, 
        password: passwordHash
      }
    });

    return res.status(201).send({ message: 'Usuário criado com sucesso!' });
  } catch(error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao criar usuário. Tente novamente mais tarde.' });
  }
});

// Função de login do usuário
app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body as any;
  
    const user = await prisma.user.findUnique({ 
      where: {
        email: email 
      },
      include: {
        goals: true
      } 
    });
    if(!user)
      return res.status(404).send({ message: 'Nenhum usuário encontrado com esse e-mail.' });
  
    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch)
      return res.status(400).send({ message: 'Senha incorreta.' });

    const userData = {
      id: user.id, 
      name: user.name, 
      email: user.email
    };

    const token = app.jwt.sign({ sub: user.id }, { expiresIn: '30d' });

    return res.status(200).send({ 
      user: userData, 
      goals: user.goals, 
      token: token, 
      message: 'Usuário logado com sucesso!' 
    });
  } catch(error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao buscar usuário. Tente novamente mais tarde.' });
  }
});

// Função que retorna todas as metas de um usuário
app.get('/users/goals',{ onRequest: [authenticateToken] } , async (req, res) => {
  try {
    const tokenUserId = req.user.sub;

    const userGoals = await prisma.goal.findMany({
      where: {
        userId: tokenUserId
      }
    });
    if(!userGoals)
      return res.status(204).send({ message: 'Nenhuma meta encontrada.' });

    return res.status(200).send({ goals: userGoals });
  } catch(error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao buscar metas. Tente novamente mais tarde.' });
  }
});

/*

  GOALS CONTROLLER

*/

// Função que retorna todas as metas
app.get('/goals', async (_, res) => {
  try {
    const allGoals = await prisma.goal.findMany();
    if(allGoals)
      return res.status(200).send({ data: allGoals });
  } catch(error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao buscar metas. Tente novamente mais tarde.' });
  }
});

// Função para criar uma nova meta
app.post('/goals', { onRequest: authenticateToken }, async (req, res) => {
  try {
    const userId = req.user.sub;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if(!user)
      return res.status(404).send({ message: 'Usuário não encontrado.' });

    const { title, startDate, endDate } = req.body as any;
    if(!title) 
      return res.status(400).send({ message: 'Título inválido.' });

    if(!startDate || !endDate)
      return res.status(400).send({ message: 'Datas inválidas.' });

    const newGoal = await prisma.goal.create({
      data: {
        title: title, 
        startDate: startDate, 
        endDate: endDate, 
        userId: userId
      }
    });

    return res.status(201).send({ data: newGoal, message: `Meta '${ title }' criada com sucesso!` });
  } catch(error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao criar meta. Tente novamente mais tarde.' });
  }
});

//Função que retorna uma meta
app.get('/goals/:goalId', async(req, res) => {
  try {
    const { goalId } = req.params as { goalId: string };

    const goal = await prisma.goal.findUnique({
      where: {
        id: goalId
      }
    })

    if(!goal)
      return res.status(404).send({ message: 'Meta não encontrada.' });

    return res.status(200).send({ data: goal });
  } catch(error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao buscar meta. Tente novamente mais tarde.' });
  }
});

// Função para inicializar o servidor
const start = () => {
  try {
    app.listen({ port: 3333, host: '0.0.0.0' });
    console.log('Servidor ouvindo na porta 3333');
  } catch(error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();