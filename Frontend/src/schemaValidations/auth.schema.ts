import z from 'zod';

// ✅ Define Request Body Schema for Login
export const LoginBody = z
    .object({
        username: z.string(),
        password: z.string().min(6).max(100),
    })
    .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

// ✅ Define Response Schema for Login (Success & Error handling)
export const LoginRes = z.object({
    value: z.string(), // JWT Token returned from API
    isSuccess: z.boolean(), // Indicates if login was successful
    isFailure: z.boolean(), // Indicates if login failed
    error: z
        .object({
            code: z.string().nullable().optional(), // Error code (if any)
            description: z.string().nullable().optional(), // Error description (if any)
        })
        .optional(), // `error` field exists but might be empty in success responses
});

export type LoginResType = z.TypeOf<typeof LoginRes>;
