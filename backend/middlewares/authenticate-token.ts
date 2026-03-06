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
    await req.jwtVerify();
  } catch(error) {
    return res.status(401).send({ message: 'Sessão expirada.' });
  }
}