import UserController from '../../app/http/Controllers/Api/UserController.js'

const userProperties = {
    id: { type: 'integer' },
    username: { type: 'string' },
    first_name: { type: 'string' },
    middle_name: { type: 'string' },
    last_name: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
    pofile_url: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
}

const tags = ['user'];

const paramsJsonSchema = {
  type: 'object',
  properties: {
    userId: { type: 'number' }
  },
  required: ['userId']
};

const queryStringJsonSchema = {
    type: 'object',
    properties: {
      filter: { type: 'string' }
    },
    required: ['filter']
};

const bodyCreateJsonSchema = {
    type: 'object',
    properties: userProperties,
    required: ['username', 
               'first_name', 
               'middle_name', 
               'last_name',
               'email',
               'phone'
            ]
};

const bodyUpdateJsonSchema = {
    type: 'object',
    properties: userProperties
};
const schemaBody =  {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "number" },
      username: { type: "string" },
      first_name: { type: 'string' },
      middle_name: { type: 'string' },
      last_name: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string' },
      pofile_url: { type: 'string' },
    },
}


const getAllSchema = {  
    tags,
    response: {
        200: {
          type: 'object',
          properties:{
            total:{type: 'number'}, 
            per_page:{type: 'number'},
            current_page:{type: 'number'},
            last_page:{type: 'number'},
            from:{type: 'number'},
            to:{type: 'number'},
            total:{type: 'number'},
            data:{ 
                type:'array',
                items:{
                    type:'object',
                    properties:userProperties
                }
              },

          }
        }
  }
}
const getOneSchema = {
    params: paramsJsonSchema,
    response: {
        200: {
            type: 'object',
            properties: userProperties
        }
    }
}
const createSchema = {
    tags,
    body: bodyCreateJsonSchema,
    response: {
      201: {
        type: 'object',
        properties: userProperties
      }
    }
};

const updateSchema = {
    tags,
    params: paramsJsonSchema,
    body: bodyUpdateJsonSchema,
    response: {
      200: {
        type: 'object',
        properties: userProperties
      }
    }
  };
  const deleteSchema = {
    tags,
    params: paramsJsonSchema,
    response: {
      // 200: {
      //   type: 'object',
      //   properties: userProperties
      // },
    }
  };

  const userRoutes = async app => {

    console.log(this)
    // app.get('/users', { schema: getAllSchema }, UserController.index)
    // app.get('/users/:userId', { schema:getOneSchema },UserController.show)
    app.post('/users', { schema: createSchema },UserController.store)
    app.put('/users/:userId', { schema:updateSchema }, UserController.update)
    app.delete('/users/:userId', { schema: deleteSchema }, UserController.delete)
    app.get('/users/tests', UserController.testNewFunction)

}

export default userRoutes