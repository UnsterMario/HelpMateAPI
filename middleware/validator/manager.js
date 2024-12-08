import vine from '@vinejs/vine';

const clientSchema = vine.object({
    id: vine.number(),
    name: vine.string().trim().optional(),
    firstname: vine.string().trim().optional(),
    address: vine.string().trim().optional(),
    password: vine.string().optional()
});

export const client = vine.compile(clientSchema);