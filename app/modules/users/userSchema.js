const userProperties = {
    id: { type: 'integer' },
    username: { type: 'string' },
    first_name: { type: 'string' },
    midle_name: { type: 'string' },
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
    id: { type: 'number' }
  },
  required: ['id']
};

const bodyCreateJsonSchema = {
    type: 'object',
    properties: userProperties,
    required: ['username', 
               'first_name', 
               'midle_name', 
               'last_name',
               'email',
               'phone'
            ]
};

const bodyUpdateJsonSchema = {
    type: 'object',
    properties: userProperties
};
export const getAllSchema = {  
    tags,
    response: {
        200: {
          type: 'object',
          properties:{
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

export const getOneSchema = {
    tags,
    params: paramsJsonSchema,
    response: {
        200: {
            type: 'object',
            properties: {
              data: userProperties
            }
        }
    }
}

export const createSchema = {
    tags,
    body: bodyCreateJsonSchema,
    response: {
      201: {
        type: 'object',
        properties: userProperties
      }
    }
};

export const updateSchema = {
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
  export const deleteSchema = {
    tags,
    params: paramsJsonSchema,
  };