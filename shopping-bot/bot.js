

const { ActivityHandler, CardFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor(conversationState,userState,dialog) {
        super();
       this.conversationState=conversationState
       this.userState=userState
       this.dialog=dialog
       this.dialogState=this.conversationState.createProperty('DialogSet')

        this.onMessage(async (context, next) => {
      await this.dialog.run(context, this.dialogState)
      await conversationState.saveChanges(context, false)
    //   const changes=[];
    //  changes.push(context.activity.text)
    //   console.log("...........changes",changes)
    //   console.log(".....................................saveChanges",context.activity.text)
      await next()
    })

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
           
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                 
                  const welcomeCard = CardFactory.adaptiveCard(
                    {
                        "type": "AdaptiveCard",
                        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                        "version": "1.3",
                       
                        "body": [
                            {
                                "type": "TextBlock",
                                "text": "**Mobile Shop**",
                                "wrap": true,
                                "spacing": "Small",
                                "maxLines": 0,
                                "style": "destructive",
                                "color": "Attention",
                                "size": "ExtraLarge",
                                "weight": "Bolder",
                                "isSubtle": true,
                                "fontType": "Monospace",
                                "horizontalAlignment": "Center"
                            },
                            {
                                "type": "Image",
                                "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFgaevgAl-M2qD1wOmeoqc02g6LBkSVAAi1b8VjgrV_hb6BMcGoe31ItZEQKAveDqvd2s&usqp=CAU",
                                "size": "Stretch"
                            }
                        ],
                        "actions": [
                            {
                                "type": "Action.Submit",
                                "title": "Mobile Purchase",
                                "style": "positive",
                                "data": "I want to buy a mobile"
                            },
                            {
                                "type": "Action.Submit",
                                "title": "Mobile Repair",
                                "style": "destructive",
                                "data": "I'm getting an mobile phone issue"
                            },
                            {
                                "type": "Action.Submit",
                                "title": "Mobile Accessories",
                                "style": "positive",
                                "data": "I want to buy a mobile accessories"
                            }
                        ],
                      
                        "verticalContentAlignment": "Center",
                        "minHeight": "5px",
                        "backgroundImage": {
                            "horizontalAlignment": "Center",
                            "verticalAlignment": "Center",
                           
                            "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY9R8YUl80SC0xJMlorPHVfgz972H9GJKj3HhDQuXcJ1IVDEO1qM0d5j4NSPeADIhvNK8&usqp=CAU"

                        }
                    }
                              )
                              await context.sendActivity({ attachments: [welcomeCard] })
                            }
                          }
                    
                          await next()
                        })
                      }
                    }
                    module.exports.EchoBot = EchoBot