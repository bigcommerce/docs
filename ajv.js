// Node.js require:


const jsonSchemaDocumentSchema = function(schema, data) {
  const Ajv = require("ajv");
  const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    console.log(validate.errors);
  } else {
    console.log('ajv says valid');
  }
}

module.exports = jsonSchemaDocumentSchema;

