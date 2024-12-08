import vine from '@vinejs/vine';

const userSchema = vine.object({
    lastName : vine.string().trim(),
    firstName : vine.string().trim(),
    telNumber : vine.string().trim(),
    mailAddress : vine.string().email().trim(),
    userPassword : vine.string()
});

const loginSchema = vine.object({
    mailAddress: vine.string().email(),
    userPassword: vine.string().trim()
});

const updateSchema = vine.object({
    lastName: vine.string().trim().optional(),
    firstName: vine.string().trim().optional(),
    telNumber: vine.string().trim().optional(),
    mailAddress: vine.string().trim().optional(),
    userPassword: vine.string().optional()
});

const adminSchema = vine.object({
    lastName: vine.string().trim(),
    firstName: vine.string().trim(),
    telNumber: vine.string().trim(),
    mailAddress: vine.string().email().trim(),
    userPassword: vine.string(),
    isAdmin: vine.boolean(),
    isRestricted: vine.boolean(),
});

export const
    user = vine.compile(userSchema),
    login = vine.compile(loginSchema),
    update = vine.compile(updateSchema),
    admin = vine.compile(adminSchema);
