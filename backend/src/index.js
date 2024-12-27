import { Hono } from 'hono';
import { userRoutes } from './routes/userRoutes';
import { blogRoutes } from './routes/blogRoutes';
import { cors } from 'hono/cors';
export const app = new Hono();
app.use('/api/*', cors());
app.get('/', (c) => {
    return c.text("welcome");
});
app.route("/api/v1/user", userRoutes);
app.route("/api/v1/blog", blogRoutes);
export default app;
