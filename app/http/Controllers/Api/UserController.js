import Users from '../../../Models/Users.js';


class UserController {

    constructor( ) {
    }
    /**
     * @param {*} req 
     * @param {*} reply 
     * @returns all users
     */
    index = async (req, reply) => {
        req.session.authenticated = true
        console.log(req.session)
        let users = null;
        if(req.query.orderBy) {
             users = await Users.query()
                                    .orderBy(req.query.orderBy)
                                    .paginate(req.query.currentPage,req.query.perPage)
          }else{
            users = await Users.query()
                               .paginate(req.query.currentPage,req.query.perPage)
          }                        
        return reply.send(users)
    }

    /**
     * 
     * @param {*} req 
     * @param {*} reply 
     * return users by id
     */
     show = async (request, reply) => { 
        /**
         * parsing id to number
         */
        console.log(request.session)
        const { params: { userId } } = request;
        const id = Number(userId)

        const user = await Users.query().findById(id).throwIfNotFound()
        reply.status(200).send(user)

    }
    /**
     * 
     * @param {*} req 
     * @param {*} reply 
     * save new user to the server 
     */
    store = async (req, reply) => {
            const createdUser =  await Users.query().insert(req.body)
            reply.status(201).send(createdUser)
    
    }

    /**
     * 
     * @param {*} req 
     * @param {*} reply 
     * @returns 
     * update userv if exists
     */
    update = async (req, reply) => {
        const { params: { userId } } = req;
        const { body } = req;
 
        const user = await Users.query().patchAndFetchById(userId, body)
                              .throwIfNotFound()
        return reply.send(user)
    }

    /**
     * 
     * @param {*} req 
     * @param {*} reply 
     * @returns 
     * delete userv if exists
     */
     delete = async (req, reply) => {
        const { params: { userId } } = req;

        const deletedUserId =await  Users.query().deleteById(userId)
        if (deletedUserId > 0){
            return reply.send({
            message: `user with id ${userId} has been deleted`,
            })
        }
        
        return reply.status(404).send({
            message: `user with id ${userId} is not found`,
            })
    }
    
    /**
     * testing any new function from base model and query builder
     * @param {*} req 
     * @param {*} reply 
     */
    testNewFunction = async ( req, reply) => {
        const userId  = await Users.query().genericQuery(req);
        reply.send({
            message: `user with id ${userId} has been deleted`,
        })
    }
}

export default new UserController()