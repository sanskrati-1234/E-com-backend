const fastify = require("fastify")({ logger: true });
const { v4: uuidv4 } = require("uuid");

let products = [];

const createResponse = (data, message) => {
    return {
      data,
      meta: {
        message
      }
    };
  };

  fastify.get("/products", (req, reply) => {
    try {
      const response = createResponse(
        { products, productRecords: products.length },
        products.length > 0 ? "Products list found" : "No products available"
      );
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  });


  fastify.post("/products",(req,response) =>{
    try{
        const {title, description,image}= req.body;
        let timestamp = new Date().toISOString();
        let product ={id:uuidv4(),timestamp:timestamp,description,title,image};
        products.push(product);
        const res= createResponse(product,"Product added successfully");
        response.code(201).send(res);
    } catch (error) {
        reply.code(500).send({ error: error.message });
      }
  })

  const PORT =  3000;
  const start = async ()=>{
    try {
       await fastify.listen(PORT,{})
    }catch{

    }
  }