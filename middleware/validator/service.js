import vine from '@vinejs/vine';

/**
 * @swagger
 * components:
 *  schemas:
 *      ServiceCreateSchema:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *              serviceDescription:
 *                  type: string
 *              authorUser:
 *                  type: integer
 *                  format: int64
 *              providerUser:
 *                  type: integer
 *                  format: int64
 *              serviceType:
 *                  type: integer
 *              latitude:
 *                  type: number
 *                  format: float
 *              longitude:
 *                  type: number
 *                  format: float
 *          required:
 *              - title
 *              - serviceDescription
 *              - authorUser
 *              - serviceType
 *          example:
 *              title: "Coupe d'arbre"
 *              serviceDescription: 'Tailler un arbre'
 *              authorUser: 1
 *              serviceType: 3
 *      ServiceUpdateSchema:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *              serviceDescription:
 *                  type: string
 *              providerUser:
 *                  type: integer
 *                  format: int64
 *              serviceType:
 *                  type: integer
 *                  format: int64
 *              latitude:
 *                  type: number
 *                  format: float
 *              longitude:
 *                  type: number
 *                  format: float
 *          example:
 *              title: "Coupe d'arbre"
 *              serviceDescription: 'Tailler un arbre'
 *              providerUser: 2
 *              serviceType: 3
 *              latitude: 50.123456
 *              longitude: 4.123456
 *      ServiceRemoveSchema:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  format: int64
 *          required:
 *              - id
 *          example:
 *              id: 1
 *      ServiceGetByIDSchema:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  format: int64
 *          required:
 *              - id
 *          example:
 *              id: 1
 *      ServiceGetByUserSchema:
 *          type: object
 *          properties:
 *              userID:
 *                  type: integer
 *                  format: int64
 *          required:
 *              - userID
 *          example:
 *              userID: 1
 */

// Schéma pour la création d'un Service
const createSchema = vine.object({
    title: vine.string().trim(), 
    serviceDescription: vine.string().trim(), 
    authorUser: vine.number(), 
    providerUser: vine.number().optional(), 
    serviceType: vine.number(), 
    latitude: vine.number().optional(),
    longitude: vine.number().optional(), 
});

// Schéma pour la mise à jour d'un Service
const updateSchema = vine.object({
    title: vine.string().trim().optional(), 
    serviceDescription: vine.string().trim().optional(), 
    providerUser: vine.number().optional(),
    serviceType: vine.number().optional(),
    latitude: vine.number().optional(),
    longitude: vine.number().optional(),
});

// Schéma pour la suppression d'un Service
const removeSchema = vine.object({
    id: vine.number(), 
});

// Schéma pour obtenir un Service par ID
const getByIDSchema = vine.object({
    id: vine.number(), 
});

// Schéma pour obtenir les services d'un utilisateur spécifique
const getByUserSchema = vine.object({
    userID: vine.number(), 
});

// Exports des schémas
export const
    create = vine.compile(createSchema),
    update = vine.compile(updateSchema),
    remove = vine.compile(removeSchema),
    getByID = vine.compile(getByIDSchema),
    getByUser = vine.compile(getByUserSchema);
