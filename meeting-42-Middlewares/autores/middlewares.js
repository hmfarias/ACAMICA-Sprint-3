//==========================================================================
// 3.1 crear middlewares propios de nuestra API
//==========================================================================

//GLOBALES-----------------------------------------------------------------
// middleware global para loggear toda peticion
function logger (req,res,next) {
    // const method = req.method;
    // const path = req.path;
    // const query = req.query;
    // const params = req.params;
    // const body = req.body;
    // destructuring 
      const { body,method,path,query,params } = req;
      console.log( ` 
      ${method} - 
      ${path} - 
      ${JSON.stringify(body)} - 
      ${JSON.stringify(query)} - 
      ${JSON.stringify(params)}
      `);
      next();
  }
  
  // VERIFICAR SI HAY DATOS EN EL ARRAY
  function validarArray (req,res,next) {
    !AUTORES || AUTORES.length === 0
    ? res.status(400).json({error:`no existen autores para mostrar`})
    : next();
  }
  
  //MIDDLEWARES PARTICULARES-------------------------------------------------
  
  //VALIDAR BODY PARA AUTOR al hacer un POST
  function validarBodyAutor (req,res,next) {
    let msgError ='';
    !req.body.nombre ?msgError+='El nombre del autor es obligatorio. ': msgError = msgError;
    !req.body.apellido ?msgError+='El apellido del autor es obligatorio. ': msgError = msgError;
    !req.body.fechaDeNacimiento ?msgError+='La fecha de nacimiento del autor es obligatoria': msgError = msgError;
    
    msgError!=='' 
      ?res.status(400).json({error: msgError})
      :next();
  }
  
  //VALIDAR BODY PARA LIBRO al hacer un POST
  function validarBodyLibro (req,res,next) {
    let msgError ='';
    !req.body.titulo ?msgError+='El titulo del libro es obligatorio. ': msgError = msgError;
    !req.body.descripcion ?msgError+='La descripcion del libro es obligatoria. ': msgError = msgError;
    !req.body.anioPublicacion ?msgError+='El año de publicación del libro es obligatorio': msgError = msgError;
    
    msgError!=='' 
      ?res.status(400).json({error: msgError})
      :next();
  }
  
  //VALIDAR EXISTENCIA DEL AUTOR (GET POR ID / PUT / DELETE)
  function existeAutor (req,res,next) {
    const autorId = req.params.id;
    const autorRespuesta = AUTORES.find(aut => aut.id == autorId);
    !autorRespuesta 
      ?res.status(400).json({error: `AUTOR con id ${autorId} no existe` })
      :next();
  }
  
  //VALIDAR EXISTENCIA DE UN LIBRO 
  function existeLibro (req,res,next) {
    const autorId = req.params.id;
    const libroID = req.params.idLibro;
    const libroRespuesta = AUTORES.find(aut => aut.id == autorId).libros.find(lib => lib.id == libroID);
    !libroRespuesta 
      ?res.status(400).json({error: `El Autor con id ${autorId}, NO registra un libro con id ${libroID}` })
      :next();
  }


module.exports = {logger, validarArray, validarBodyAutor, validarBodyLibro, existeAutor, existeLibro }