const {
  ComponentDialog,
  ChoicePrompt,
  TextPrompt,
  WaterfallDialog,
} = require('botbuilder-dialogs')

class MobileRepair extends ComponentDialog {
  constructor(id) {
    super(id)
    this.addDialog(new ChoicePrompt('orderstatus'))
    this.addDialog(new TextPrompt('appointment'))
    this.addDialog(
      new WaterfallDialog('WATERFALL', [
        this.firstStep.bind(this),
        this.secondstep.bind(this),
      ]),
    )
    this.initialDialogId = 'WATERFALL'
  }
  async firstStep(StepContext) {
    return await StepContext.prompt('orderstatus', {
      prompt: 'Which issue?',
      choices: [
        'Phone Is Not Charging',
        'cracked screen issue',
        'Apps not downloaded',
        'overheated',
        'Storage problem',
        'My smartphone is running slow',
      ],
    })
  }

  async secondstep(StepContext) {
   await StepContext.prompt('appointment', {
      prompt: 'Thank you.............!one of the our agent will come and slove the issue..!',
    })
    return await StepContext.endDialog()
  }
}

module.exports.MobileRepair = MobileRepair
