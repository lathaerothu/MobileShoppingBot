const {
      ComponentDialog,
      DialogSet,
      DialogTurnStatus,
      WaterfallDialog,
      ChoicePrompt,
      TextPrompt,
    } = require('botbuilder-dialogs')
    
    const { CLU } = require('../CLU integration/clu')
   
    const { MobilePurchase } = require('./MobilePurchase')
    const { MobileRepair }=require('./MobileRepair')
    const{ MobileAccessories}=require('./MobileAccessories')
    class RootDialog extends ComponentDialog {
      constructor(conversationState, userState) {
        super('MainDialog')
    
        this.conversationState = conversationState
        this.userState = userState
        this.addDialog(new ChoicePrompt('orderstatus'))
       this.addDialog(new TextPrompt('appointment'))
        this.addDialog(new MobilePurchase('MobilePurchase'))
        this.addDialog(new MobileRepair('MobileRepair'))
        this.addDialog(new MobileAccessories('MobileAccessories'))
        this.addDialog(
          new WaterfallDialog('WATERFALL',
           [this.firstStep.bind(this)],
          
        ),
        )
        this.initialDialogId = 'WATERFALL'
      }
    
   
    async firstStep(stepContext) {
      let topIntent = await CLU(stepContext.context)
      
    
      console.log('topIntent', topIntent)
      
      if (topIntent.topIntent == 'greetings') {
        return await stepContext.context.sendActivity('Hello, How are you?')
      } else if (topIntent.topIntent == 'Mobile purchase') {
        return await stepContext.beginDialog('MobilePurchase')
      }else if (topIntent.topIntent == 'Mobile Repair') {
        return await stepContext.beginDialog('MobileRepair')
      }else if(topIntent.topIntent == 'Mobile Accessories'){
        return await stepContext.beginDialog('MobileAccessories')
      }
       else {
        return await stepContext.context.sendActivity('Hello,I am default result')
      }
    }





      async run(context, statePropertyAccessor) {
        let dialogSet = new DialogSet(statePropertyAccessor)
        dialogSet.add(this)
        const dialogContext = await dialogSet.createContext(context)
        let results = await dialogContext.continueDialog()
        if (results.status == DialogTurnStatus.empty) {
          await dialogContext.beginDialog(this.id)
        }
      }
    }
    
    module.exports.RootDialog = RootDialog
    