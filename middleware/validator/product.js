import vine from '@vinejs/vine';

/**
 * @swagger
 * components:
 *  schemas:
 *      ProductIDSchema:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *          required:
 *              - id
 */
const productIDSchema = vine.object({
    id: vine.number()
});

/**
 * @swagger
 * components:
 *  schemas:
 *      ProductToAdd:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              price:
 *                  type: number
 *          required:
 *              - name
 *              - price
 */
const productToAddSchema = vine.object({
    name: vine.string().trim(),
    price: vine.number(),
});

/**
 * @swagger:
 * components:
 *  schemas:
 *      ProductToUpdate:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *              price:
 *                  type: number
 *          required:
 *              - id
 */
const productToUpdateSchema = vine.object({
    id: vine.number(),
    name: vine.string().trim().optional(),
    price: vine.number().optional(),
});


export const
    searchedProduct = vine.compile(productIDSchema),
    productToAdd = vine.compile(productToAddSchema),
    productToUpdate = vine.compile(productToUpdateSchema),
    productToDelete = vine.compile(productIDSchema);

