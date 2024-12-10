import vine from '@vinejs/vine';

// Schéma pour la création d'un TypeService
const createSchema = vine.object({
    typeName: vine.string().trim(),
    typeDescription: vine.string().trim(),
    imagePath: vine.string().url().optional() // L'image est optionnelle mais doit être une URL valide si présente
});

// Schéma pour la mise à jour d'un TypeService
const updateSchema = vine.object({
    typeName: vine.string().trim().optional(),
    typeDescription: vine.string().trim().optional(),
    imagePath: vine.string().url().optional() // L'image est optionnelle mais doit être une URL valide si présente
});

// Schéma pour la suppression d'un TypeService
const removeSchema = vine.object({
    id: vine.string().trim() // Plus besoin de .required(), Vine valide que le champ est présent dans le corps de la requête
});

// Schéma pour obtenir un TypeService par ID
const getByIDSchema = vine.object({
    id: vine.string().trim() // Plus besoin de .required(), Vine valide que le champ est présent dans le corps de la requête
});

export const
    create = vine.compile(createSchema),
    update = vine.compile(updateSchema),
    remove = vine.compile(removeSchema),
    getByID = vine.compile(getByIDSchema);
