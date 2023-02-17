const {
  ComponentDialog,
  WaterfallDialog,
  ChoicePrompt,
  TextPrompt,
  DialogTurnStatus,
} = require('botbuilder-dialogs')
const { CardFactory } = require('botbuilder')
var ACData = require('adaptivecards-templating')

var getdata = []
class MobileAccessories extends ComponentDialog {
  constructor(id) {
    super(id)
    this.addDialog(new TextPrompt('Order'))
    this.addDialog(new ChoicePrompt('payment'))
    this.addDialog(
      new WaterfallDialog('WATERFALL', [
        this.DisplayAccessories.bind(this),
        this.OrderAccessories.bind(this),
        this.OrderAddress.bind(this),
        this.OrderPaymenttype.bind(this),
        this.PlaceOrder.bind(this),
        this.OrderConform.bind(this),
      ]),
    )
    this.initialDialogId = 'WATERFALL'
  }
  async DisplayAccessories(StepContext) {
    const MobileAccessoriesCard = CardFactory.adaptiveCard({
      type: 'AdaptiveCard',
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      version: '1.3',
      body: [
        {
          type: 'ActionSet',
          actions: [
            {
              type: 'Action.Submit',
              title: 'USB cable',
              iconUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR93yFTda7RuborDJVp1Q0YvYwQ_ePcoWAAag&usqp=CAU',
              style: 'positive',
              data: 'USB cable',
            },
          ],
        },
        {
          type: 'ActionSet',

          actions: [
            {
              type: 'Action.Submit',
              title: 'headphones',
              iconUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9MjP_3zMLWKYrbOKdxnc9fIBb0KJJUGT8lg&usqp=CAU',
              style: 'destructive',
              data: 'headphones',
            },
          ],
        },
        {
          type: 'ActionSet',
          actions: [
            {
              type: 'Action.Submit',
              title: 'data cables',
              iconUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu3qc8OJa_u04gyqXvDuxc8V86wy33kSp63A&usqp=CAU',
              style: 'positive',
              data: 'data cables',
            },
          ],
        },
       
        {
          type: 'ActionSet',

          actions: [
            {
              type: 'Action.Submit',
              title: 'mobile chargers',
              style: 'destructive',
              
              iconUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH-EvZ8tWN9yTDOGZGdDcFMpfob03C00O92w&usqp=CAU',
              data: 'mobile chargers',
            },
          ],
        },
        {
          type: 'ActionSet',

          actions: [
            {
              type: 'Action.Submit',
              title: 'power banks',
              iconUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLjyh4r03gpYiZhk-7bgZQevCFBBA5w3bYYw&usqp=CAU',
              style: 'positive',
              data: 'power banks',
            },
          ],
        },
      ],
      "backgroundImage": {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-9zILMB9OntN_SDkwN2oBHiT28oP9-PygZA&usqp=CAU"
    }
    })

    await StepContext.context.sendActivity({
      attachments: [MobileAccessoriesCard],
    })
    return {
      status: DialogTurnStatus.waiting,
    }
  }

  async OrderAccessories(StepContext) {
    //     console.log("step----------------",StepContext.result)
    StepContext.values.info = {}
    StepContext.values.info['Accessories'] = StepContext.result
    console.log('StepContext.values.info', StepContext.values.info)
   // getdata.push(StepContext.context.activity.text)
     console.log(" StepContext.values.info['Accessories'] ", StepContext.values.info['Accessories'] )
    var axios = require('axios')

    var config = {
      method: 'post',
      url: `http://localhost:7000/MobileAccessories/${StepContext.result}`,
      headers: {},
    }
    try {
      var response = await axios(config)
      let data = response.data[0]
      data.Models = JSON.parse(data.Models)
      StepContext.values.info['models'] = data.Models

      // console.log( "StepContext.values.info['models']", StepContext.values.info['models'])
      let card = {
        type: 'AdaptiveCard',
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        version: '1.3',
        body: [
          {
            type: 'TextBlock',
            text: '${Accessories}',
            wrap: true,
            horizontalAlignment: 'Center',
            size: 'ExtraLarge',
            weight: 'Bolder',
          },
          {
            type: 'ColumnSet',
            $data: '${Models}',
            columns: [
              {
                type: 'Column',
                width: 'stretch',
                items: [
                  {
                    type: 'TextBlock',
                    text: '${model}',
                    wrap: true,
                    color: 'Accent',
                    size: 'Medium',
                    horizontalAlignment: 'Center',
                    weight: 'Bolder',
                  },
                ],
              },
              {
                type: 'Column',
                width: 'stretch',
                items: [
                  {
                    type: 'TextBlock',
                    text: '${Cost}',
                    wrap: true,
                    horizontalAlignment: 'Center',
                    height: 'stretch',
                    size: 'Medium',
                    weight: 'Bolder',
                    color: 'Accent',
                  },
                ],
              },
              {
                type: 'Column',
                width: 'stretch',
                items: [
                  {
                    type: 'ActionSet',
                    actions: [
                      {
                        type: 'Action.Submit',
                        title: 'Take Away',
                        style: 'positive',
                        data: '${model}',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        "backgroundImage": {
          "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5YpJa04hUDPy3oRdtdougUxVCexcT1ZeSXg&usqp=CAU"
      }
      }
      var template = new ACData.Template(card)
      var cardLayout = {
        $root: data,
      }
      var cards = template.expand(cardLayout)
      var carddata = CardFactory.adaptiveCard(cards)

      await StepContext.context.sendActivity({ attachments: [carddata] })
      return {
        status: DialogTurnStatus.waiting,
      }
    } catch (error) {
      console.log(error)
    }
  }
  async OrderAddress(StepContext) {

   // getdata.push(StepContext.context.activity.text)
    console.log("hhhhhhhhhhhhhhhhhhh-------------------",StepContext.values.info)

    StepContext.values.info['modelName'] = StepContext.result
    console.log("StepContext.values.info['modelName'] ",StepContext.values.info['modelName'] )
    console.log(
      'hhhhhhhhhhhhhhhhhhh-------------------',
      StepContext.values.info,
    )
    let models = StepContext.values.info.models
    let modelname = StepContext.values.info.modelName
    for (let i = 0; i < models.length; i++) {
      if (models[i].model == modelname) {
        StepContext.values.info['cost']= StepContext.values.info.models[i].Cost

         console.log("StepContext.values.info['cost']", StepContext.values.info['cost'])
        //  getdata.push(model[i].Cost)
        //  console.log('getdata',getdata)
      }
    }
    return await StepContext.prompt('Order', {
      prompt: 'Please Enter your address?',
    })
  }

  async OrderPaymenttype(StepContext) {
    StepContext.values.info['address']=StepContext.result

    //getdata.push(StepContext.context.activity.text)
     console.log(" StepContext.values.info['address']", StepContext.values.info['address'])
    return await StepContext.prompt('payment', {
      prompt: 'Payment type',
      choices: [
        'Credit/Debit card',
        'UPI',
        'Net Banking',
        'Wallet',
        'Cash on  delivery',
      ],
    })
  }

  async PlaceOrder(StepContext) {
    StepContext.values.info['payment']=StepContext.result.value
    console.log(" StepContext.values.info['payment']", StepContext.values.info['payment'])
    //getdata.push(StepContext.context.activity.text)

    // console.log('...........changes--changes[3]', changes[3])
    
    let placeorder = {
      "type": "AdaptiveCard",
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "version": "1.3",
      "backgroundImage": {
          "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqz3SWgoSGEO8UAtJepYcjNDTsOCOs9VNSlA&usqp=CAU"
      },
      "body": [
          {
              "type": "TextBlock",
              "text": "Payment Details",
              "wrap": true,
              "horizontalAlignment": "Center",
              "size": "ExtraLarge",
              "weight": "Bolder",
              "color": "Attention"
          },
          {
              "type": "ColumnSet",
              "columns": [
                  {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                          {
                              "type": "TextBlock",
                              "text": "MobileName",
                              "wrap": true,
                              "horizontalAlignment": "Center",
                              "size": "Medium",
                              "weight": "Bolder",
                              "color": "Default"
                          }
                      ]
                  },
                  {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                          {
                              "type": "TextBlock",
                              "text": StepContext.values.info.Accessories,
                              "wrap": true,
                              "size": "Medium",
                              "weight": "Bolder",
                              "color": "Default"
                          }
                      ]
                  }
              ]
          },
          {
              "type": "ColumnSet",
              "columns": [
                  {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                          {
                              "type": "TextBlock",
                              "text": "Model",
                              "wrap": true,
                              "horizontalAlignment": "Center",
                              "size": "Medium",
                              "weight": "Bolder",
                              "color": "Dark"
                          }
                      ]
                  },
                  {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                          {
                              "type": "TextBlock",
                              "text": StepContext.values.info.modelName,
                              "wrap": true,
                              "size": "Medium",
                              "weight": "Bolder",
                              "color": "Default"
                          }
                      ]
                  }
              ]
          },
          {
              "type": "ColumnSet",
              "columns": [
                  {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                          {
                              "type": "TextBlock",
                              "text": "Cost",
                              "wrap": true,
                              "horizontalAlignment": "Center",
                              "size": "Medium",
                              "weight": "Bolder"
                          }
                      ]
                  },
                  {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                          {
                              "type": "TextBlock",
                              "text":StepContext.values.info.cost,
                              "wrap": true,
                              "size": "Medium",
                              "weight": "Bolder",
                              "color": "Default"
                          }
                      ]
                  }
              ]
          },
          {
              "type": "ColumnSet",
              "columns": [
                  {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                          {
                              "type": "TextBlock",
                              "text": "Address",
                              "wrap": true,
                              "horizontalAlignment": "Center",
                              "size": "Medium",
                              "weight": "Bolder"
                          }
                      ]
                  },
                  {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                          {
                              "type": "TextBlock",
                              "text": StepContext.values.info.address,
                              "wrap": true,
                              "size": "Medium",
                              "weight": "Bolder",
                              "color": "Default"
                          }
                      ]
                  }
              ]
          },
          {
              "type": "ColumnSet",
              "columns": [
                  {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                          {
                              "type": "TextBlock",
                              "text": "Payment Mode",
                              "wrap": true,
                              "horizontalAlignment": "Center",
                              "size": "Medium",
                              "weight": "Bolder"
                          }
                      ]
                  },
                  {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                          {
                              "type": "TextBlock",
                              "text":StepContext.values.info.payment,
                              "wrap": true,
                              "size": "Medium",
                              "weight": "Bolder",
                              "color": "Default"
                          }
                      ]
                  }
              ]
          },
          {
              "type": "ColumnSet",
              "columns": [
                  {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                          {
                              "type": "Image",
                              "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwYk3YtkWpY6h3QlEUhUaE6lJpQDS1sFwTxdwCROxK-g&s",
                              "horizontalAlignment": "Right",
                              "size": "Medium"
                          }
                      ]
                  }
              ]
          },
          {
              "type": "ColumnSet",
              "columns": [
                  {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                          {
                              "type": "ActionSet",
                              "actions": [
                                  {
                                      "type": "Action.Submit",
                                      "title": "Proceed",
                                      "style": "positive",
                                      "data": 'Proceed',
                                  }
                              ],
                              "horizontalAlignment": "Center"
                          }
                      ]
                  }
              ]
          }
      ]
  }
    var template = new ACData.Template(placeorder)
    var cardLayout = {
      $root: {
        getdata: [
          StepContext.values.info.Accessories,
         StepContext.values.info.modelName,

         StepContext.values.info.cost ,
         StepContext.values.info.address,
         StepContext.values.info.payment,
        ],
      },
    }

    var card = template.expand(cardLayout)
    var carddata = CardFactory.adaptiveCard(card)
    await StepContext.context.sendActivity({ attachments: [carddata] })
    return {
      status: DialogTurnStatus.waiting,
    }
  }

  async OrderConform(StepContext) {
    // changes.push(StepContext.context.activity.text)
    console.log("StepContext.values.info",StepContext.values.info)
    console.log(StepContext.values.info.Accessories)
console.log(StepContext.values.info.modelName)
console.log(StepContext.values.info.cost)
console.log(StepContext.values.info.address)
console.log(StepContext.values.info.payment)
    // console.log('...........changes--changes[3]', changes)
    const welcomeCard = CardFactory.adaptiveCard({
      type: 'AdaptiveCard',
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      version: '1.3',
      body: [
        {
          type: 'Image',
          url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToTykU2BZtuaSIFXvPHnTJsaL-Z3NgRvA2sA&usqp=CAU',
          horizontalAlignment: 'Center',
          size: 'Stretch',
        },
        {
          type: 'TextBlock',
          text: 'Thank you....Your Order is Placed Sucessfully....!',
          wrap: true,
          horizontalAlignment: 'Center',
          size: 'ExtraLarge',
          weight: 'Bolder',
          color: 'Accent',
          height: 'stretch',
          fontType: 'Default',
          spacing: 'Padding',
        },
      ],
      "backgroundImage": {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtG4oA1U4IbBNacJ6KCUYB83xgE2bl66NMcw&usqp=CAU"
    },
    })
     await StepContext.context.sendActivity({
      attachments: [welcomeCard],
    })
    return await StepContext.endDialog()
  }
}

module.exports.MobileAccessories = MobileAccessories
