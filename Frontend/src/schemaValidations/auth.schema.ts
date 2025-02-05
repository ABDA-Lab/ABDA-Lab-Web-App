import z from 'zod';

// ✅ Define Request Body Schema for Login
export const LoginBody = z
    .object({
        username: z
            .string()
            .nonempty('Username is required')
            .min(3, 'Username must be at least 3 characters long'), // Username validation
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters long')
            .max(100, 'Password must not exceed 100 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'), // Password validation
    })
    .strict();

export type LoginBodyType = z.infer<typeof LoginBody>;

// ✅ Define Request Body Schema for Register
export const RegisterBody = z
    .object({
        username: z.string().nonempty('Username is required').min(3, 'Username must be at least 3 characters long'),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters long')
            .max(100, 'Password must not exceed 100 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
        confirmPassword: z.string(),
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'], 
    });


export type RegisterBodyType = z.infer<typeof RegisterBody>;

// ✅ Define Response Schema for Register (Success & Error handling)
export const RegisterRes = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.object({
        isSuccess: z.boolean(),
        isFailure: z.boolean(),
        error: z.object({
            code: z.string(),
            description: z.string()
        })
    })
});

export type RegisterResType = z.infer<typeof RegisterRes>;

// ✅ Define Response Schema for Login (Success & Error handling)
export const LoginRes = z.object({
    value: z
        .object({
            accessToken: z.string(), // JWT Access Token
            refreshToken: z.string(), // JWT Refresh Token
        })
        .optional(), // `value` is present only in success responses
    isSuccess: z.boolean(), // Indicates if login was successful
    isFailure: z.boolean(), // Indicates if login failed
    error: z
        .object({
            code: z.string().nullable(), // Error code (if any)
            description: z.string().nullable(), // Error description (if any)
        })
        .nullable(), // `error` can be null or undefined in success responses
});

export type LoginResType = z.infer<typeof LoginRes>;
