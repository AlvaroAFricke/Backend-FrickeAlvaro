import User from '../persistence/userMongo.js';

export const createUser = async (userData) => {
  const { username, password } = userData;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new Error('Username already exists');
  }

  const user = new User({ username });
  user.password = user.generateHash(password);
  await user.save();

  return user;
};

export const getUserByUsername = async (username) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
