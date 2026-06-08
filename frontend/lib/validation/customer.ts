import { z } from 'zod';

export const customerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email"),
    city: z.string().min(3, "City must be at least 3 characters")
})