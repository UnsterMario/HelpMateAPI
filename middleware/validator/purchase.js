import vine from '@vinejs/vine';

/**
 * @swagger
 * components:
 *  schemas:
 *      purchaseToAdd:
 *          type: object
 *          properties:
 *              articleID:
 *                  type: integer
 *              quantity:
 *                  type: integer
 *          required:
 *              - articleID
 *              - quantity
 */
const purchaseToAddSchema = vine.object({
    articleID: vine.number(),
    quantity: vine.number()
});

/**
 * @swagger
 * components:
 *    schemas:
 *      purchaseWithRegistration:
 *          type: object
 *          properties:
 *              client:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      firstname:
 *                          type: string
 *                      address:
 *                          type: string
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *                          format: password
 *                  required:
 *                      - name
 *                      - firstname
 *                      - address
 *                      - email
 *                      - password
 *              purchase:
 *                  type: object
 *                  properties:
 *                      articleID:
 *                          type: integer
 *                      quantity:
 *                          type: integer
 *                  required:
 *                      - articleID
 *                      - quantity
 *          required:
 *              - client
 *              - purchase
 */
const purchaseWithRegistrationSchema = vine.object({
    client: vine.object({
        name: vine.string().trim(),
        firstname: vine.string().trim(),
        address: vine.string().trim(),
        email: vine.string().email().trim(),
        password: vine.string()
    }),
    purchase: vine.object({
        articleID: vine.number(),
        quantity: vine.number()
    })
});


export const
    purchaseToAdd = vine.compile(purchaseToAddSchema),
    purchaseWithRegistration = vine.compile(purchaseWithRegistrationSchema);