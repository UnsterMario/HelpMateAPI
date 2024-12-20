import vine from '@vinejs/vine';

const messageSchema = vine.object({
    content: vine.string().trim()
});

export const 
    create = vine.compile(messageSchema),
    update = vine.compile(messageSchema);
