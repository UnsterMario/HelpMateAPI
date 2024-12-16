import vine from '@vinejs/vine';

const aboutUsSchema = vine.object({
    content: vine.string().trim(),
});

export const 
    create = vine.compile(aboutUsSchema),
    update = vine.compile(aboutUsSchema);


