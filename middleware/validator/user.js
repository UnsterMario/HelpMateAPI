import vine from '@vinejs/vine';

/**
 * @swagger
 * components:
 *  schemas:
 *      UserSchema:
 *          type: object
 *          properties:
 *              lastName:
 *                  type: string
 *              firstName:
 *                  type: string
 *              telNumber:
 *                  type: string
 *              mailAddress:
 *                  type: string
 *              userPassword:
 *                  type: string
 *          required:
 *              - lastName
 *              - firstName
 *              - telNumber
 *              - mailAddress
 *              - userPassword
 *          example:
 *              lastName: 'Haubert'
 *              firstName: 'John'
 *              telNumber: '1234567890'
 *              mailAddress: 'john.haubert@gmail.com'
 *              userPassword: 'password'
 *      LoginSchema:
 *          type: object
 *          properties:
 *              mailAddress:
 *                  type: string
 *              userPassword:
 *                  type: string
 *          required:
 *              - mailAddress
 *              - userPassword
 *          example:
 *              mailAddress: 'john.haubert@gmail.com'
 *              userPassword: 'password'
 *      UpdateSchema:
 *          type: object
 *          properties:
 *              lastName:
 *                  type: string
 *              firstName:
 *                  type: string
 *              telNumber:
 *                  type: string
 *              mailAddress:
 *                  type: string
 *          example:
 *              lastName: 'Doret'
 *              firstName: 'Kevin'
 *              telNumber: '1234567890'
 *              mailAddress: 'kevin.doret@gmail.com'
 *      AdminSchema:
 *          type: object
 *          properties:
 *              lastName:
 *                  type: string
 *              firstName:
 *                  type: string
 *              telNumber:
 *                  type: string
 *              mailAddress:
 *                  type: string
 *              userPassword:
 *                  type: string
 *              isAdmin:
 *                  type: boolean
 *          required:
 *              - lastName
 *              - firstName
 *              - telNumber
 *              - mailAddress
 *              - userPassword
 *          example:
 *              lastName: 'Doe'
 *              firstName: 'John'
 *              telNumber: '1234567890'
 *              mailAddress: 'john.doe@example.com'
 *              userPassword: 'password'
 *              isAdmin: true
 *      AdminPanelSchema:
 *          type: object
 *          properties:
 *              lastName:
 *                  type: string
 *              firstName:
 *                  type: string
 *              telNumber:
 *                  type: string
 *              mailAddress:
 *                  type: string
 *              isAdmin:
 *                  type: boolean
 *          required:
 *              - lastName
 *              - firstName
 *              - telNumber
 *              - mailAddress
 *          example:
 *              lastName: 'Doe'
 *              firstName: 'John'
 *              telNumber: '1234567890'
 *              mailAddress: 'john.doe@example.com'
 *              isAdmin: true
 *      UserWithServiceSchema:
 *          type: object
 *          properties:
 *              user:
 *                  $ref: '#/components/schemas/UserSchema'
 *              service:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      latitude:
 *                          type: number
 *                      longitude:
 *                          type: number
 *                      serviceDescription:
 *                          type: string
 *                      serviceType:
 *                          type: integer
 *                      providerUser:
 *                          type: string
 *                  required:
 *                      - title
 *                      - latitude
 *                      - longitude
 *                      - serviceDescription
 *                      - serviceType
 *          example:
 *              user:
 *                  lastName: 'Doe'
 *                  firstName: 'John'
 *                  telNumber: '1234567890'
 *                  mailAddress: 'john.doe@example.com'
 *                  userPassword: 'password'
 *              service:
 *                  title: 'Gardening'
 *                  latitude: 48.8566
 *                  longitude: 2.3522
 *                  serviceDescription: 'Lawn mowing and garden maintenance'
 *                  serviceType: 'Outdoor'
 */

const userSchema = vine.object({
    lastName : vine.string().trim(),
    firstName : vine.string().trim(),
    telNumber : vine.string().trim(),
    mailAddress : vine.string().email().trim(),
    userPassword : vine.string()
});

const loginSchema = vine.object({
    mailAddress: vine.string().email(),
    userPassword: vine.string().trim()
});

const updateSchema = vine.object({
    lastName: vine.string().trim().optional(),
    firstName: vine.string().trim().optional(),
    telNumber: vine.string().trim().optional(),
    mailAddress: vine.string().trim().optional(),
    userPassword: vine.string().optional(),
    isAdmin: vine.boolean().optional(),
    isRestricted: vine.boolean().optional()
});

const adminSchema = vine.object({
    lastName: vine.string().trim(),
    firstName: vine.string().trim(),
    telNumber: vine.string().trim(),
    mailAddress: vine.string().email().trim(),
    userPassword: vine.string().trim(),
    isAdmin: vine.boolean(),
});

const userWithServiceSchema = vine.object({
    user: vine.object({
        lastName: vine.string().trim(),
        firstName: vine.string().trim(),
        telNumber: vine.string().trim(),
        mailAddress: vine.string().email().trim(),
        userPassword: vine.string()
    }),
    service: vine.object({
        title: vine.string().trim(),
        latitude: vine.number(),
        longitude: vine.number(),
        serviceDescription: vine.string().trim(),
        serviceType: vine.number(),
        providerUser: vine.string().optional(),
    }),
});

export const
    user = vine.compile(userSchema),
    login = vine.compile(loginSchema),
    update = vine.compile(updateSchema),
    admin = vine.compile(adminSchema),
    userWithService = vine.compile(userWithServiceSchema);