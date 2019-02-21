import bcrypt from 'bcryptjs';

const encryptPassword = async ({ password }) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch ({ message }) {
    console.log('[encryptPassword.js]', message);
  }
};

export default encryptPassword;
