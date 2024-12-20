import vine from '@vinejs/vine';

/**
 * @swagger
 * components:
 *  schemas:
 *      ConversationSchema:
 *          type: object
 *          properties:
 *              user1:
 *                  type: integer
 *              user2:
 *                  type: integer
 *          required:
 *              - user1
 *              - user2
 *          example:
 *              user1: 1
 *              user2: 2
 */

const conversationSchema = vine.object({
    user1: vine.number(),
    user2: vine.number()
});

export const 
    create = vine.compile(conversationSchema);
