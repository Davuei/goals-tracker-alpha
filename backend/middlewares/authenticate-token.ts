import { FastifyReply, FastifyRequest } from "fastify";
import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
    }
  }
}

export async function authenticateToken(req: FastifyRequest, res: FastifyReply) {
  try {
    req.jwtVerify();
  } catch(error) {
    console.error(error);
    return res.status(401).send({ message: 'Token inválido.' });
  }
}