import sequelize from '../../db/connection';
import { UtilService } from './service';

const utilService = new UtilService();

beforeAll(async () => {
  (async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
    } catch (error) {
      console.log(error);
    }
  })();
});

describe('UtilService', () => {
  let token = '';
  it('should generate an accessToken', async () => {
    const accessToken = await utilService.generateToken(1);

    token = accessToken;
    expect(accessToken).toBeDefined();
  });

  it('should verify access token', async () => {
    const refreshToken = await utilService.validateToken(token);

    expect(refreshToken).toBeDefined();
  });

  it("should throw an error if token isn't valid", async () => {
    try {
      await utilService.validateToken('invalid token');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
