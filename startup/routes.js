import userRoutes from '../routes/users';
import mealRoutes from '../routes/meals';
import auth from '../middleware/auth';

const routes = app => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/meals', auth, mealRoutes);
};

export default routes;
