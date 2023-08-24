import { sign, verify } from 'jsonwebtoken';

export class UtilService {
  async generateToken(id: number) {
    const access_token = sign(
      {
        id,
      },
      (process.env.JWT_SECRET as string) || 'secret',
      {
        expiresIn: '14d',
      }
    );

    return access_token;
  }

  async validateToken(token: string) {
    const decoded = verify(
      token,
      (process.env.JWT_SECRET as string) || 'secret'
    );

    return decoded;
  }
}
