import vine from '@vinejs/vine';

// Schéma pour la création d'un Service
const createSchema = vine.object({
    title: vine.string().trim(), // Non-empty title, ensured by trim
    serviceDescription: vine.string().trim(), // Same for description
    authorUser: vine.number(), // ID de l'utilisateur créateur
    providerUser: vine.number().optional(), // ID du prestataire, facultatif
    serviceType: vine.number(), // ID du type de service
    latitude: vine.number().optional(), // Coordonnée facultative
    longitude: vine.number().optional(), // Coordonnée facultative
});

// Schéma pour la mise à jour d'un Service
const updateSchema = vine.object({
    title: vine.string().trim().optional(), // Optional title, no .min(1)
    serviceDescription: vine.string().trim().optional(), // Optional description
    providerUser: vine.number().optional(),
    serviceType: vine.number().optional(),
    latitude: vine.number().optional(),
    longitude: vine.number().optional(),
});

// Schéma pour la suppression d'un Service
const removeSchema = vine.object({
    id: vine.number(), // ID obligatoire pour la suppression
});

// Schéma pour obtenir un Service par ID
const getByIDSchema = vine.object({
    id: vine.number(), // ID obligatoire pour récupérer un service
});

// Schéma pour obtenir les services d'un utilisateur spécifique
const getByUserSchema = vine.object({
    userID: vine.number(), // ID de l'utilisateur pour récupérer ses services
});

// Exports des schémas compilés
export const
    create = vine.compile(createSchema),
    update = vine.compile(updateSchema),
    remove = vine.compile(removeSchema),
    getByID = vine.compile(getByIDSchema),
    getByUser = vine.compile(getByUserSchema);
