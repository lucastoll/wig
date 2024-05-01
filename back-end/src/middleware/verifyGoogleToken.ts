import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { googleToken, email } = req.body;

  if (!googleToken) {
    res.status(400).json({
      error: "O campo googleToken é obrigatório",
    });
    return;
  }

  if (!email) {
    res.status(400).json({
      error: "O campo email é obrigatório",
    });
    return;
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).json({
        error: "Token inválido",
      });
      return;
    }

    if (email !== payload.email) {
      res.status(400).json({
        error: "O token do Google não corresponde ao usuário",
      });
      return;
    }

    next();
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: "Token inválido",
    });
  }
}
