import jwt, { SignOptions, Secret, JwtPayload } from "jsonwebtoken";

const SECRET: Secret = process.env.JWT_SECRET || "supersecret";
const EXPIRES = process.env.JWT_EXPIRES_IN || "1h";

export const signToken = (payload: object): string => {
  const options: SignOptions = { expiresIn: EXPIRES as any };
  return jwt.sign(payload, SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, SECRET) as JwtPayload;
};
