import vine from '@vinejs/vine';

const managerSchema = vine.object({
    id: vine.number(),
    name: vine.string().trim().optional(),
    firstname: vine.string().trim().optional(),
    address: vine.string().trim().optional(),
    password: vine.string().optional()
});

export const managerValidatorMiddleware = {
    updateClient: async (req, res, next) => {
        try {
            req.val = await vine.compile(managerSchema).validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};
