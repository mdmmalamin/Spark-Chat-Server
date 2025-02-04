import jwt, { JwtPayload } from "jsonwebtoken";

const generateToken = (
  payload: {
    _id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
    status: "ACTIVE" | "BLOCKED";
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

const isJWTIssuedBeforePasswordChanged = (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) => {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const jwtToken = {
  generateToken,
  verifyToken,
  isJWTIssuedBeforePasswordChanged,
};
