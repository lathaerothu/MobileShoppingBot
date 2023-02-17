const { CustomCLU } = require('conversational-language-understanding')

var Clu = new CustomCLU(
  'https://wbakb.cognitiveservices.azure.com',
  '86198e5f031546a9a9f8f5c7e1862de1',
  'Shopping-Bot',
  'deploy-2',
)

async function CLU(context) {
  let cluResult = await Clu.CluRecognizer(context)
  //console.log('cluResult', cluResult)
  return cluResult.prediction
}
module.exports.CLU = CLU
