// import objection from 'objection';
const objection = require('objection')

// export default function (err, req, res){
module.exports =  function (err, req, res){
    const {NotFoundError, ValidationError, UniqueViolationError} = objection;
    // const {nativeError} = err
    const { validation, validationContext } = err
    const constraint =  err.constraint
    /**
     * app erros
     */

     if (validation) {
        res.status(400).send({
            error: {
             statusCode: 400,
             message: `${validationContext}: ${validation[0].message} `,
            },
         })
     }

    /**
     * database Errors
     */

    if (err instanceof UniqueViolationError){
        const column = constraint.split('.')
                                 .pop()
                                 .replace('users_','')
                                 .replace('_unique','')
        res.status(409).send({
            error: {
             statusCode: 409,
             message: `${column} ${req.body[column]} exist`,
             column: `${column}`
            },
         })
    }

    if (err instanceof NotFoundError) {
        res.status(404).send({
            error:{
                statusCode: 409,
                message: `item with id ${Object.values(req.params)[0]} is not found`,
                type: 'NotFound',
            }
        });
    }

    res.send(err)
}