const {
  ComponentDialog,

  TextPrompt,
  WaterfallDialog,
  DialogTurnStatus,
} = require('botbuilder-dialogs')
const { CardFactory } = require('botbuilder')
//const conversationState=[];
const changes = []

var ACData = require('adaptivecards-templating')
class MobilePurchase extends ComponentDialog {
  constructor(id) {
    super(id)

    this.addDialog(new TextPrompt('appointment'))
    this.addDialog(
      new WaterfallDialog('WATERFALL', [
        this.DisplayMobiles.bind(this),
        this.OrderModels.bind(this),
        this.OrderAddress.bind(this),
        this.OrderPayment.bind(this),
        this.PlaceOrder.bind(this),
        this.OrderConform.bind(this),
      ]),
    )
    this.initialDialogId = 'WATERFALL'
  }

  async DisplayMobiles(StepContext) {
    StepContext.values.info = {}
    const MobileCard = CardFactory.adaptiveCard({
      type: 'AdaptiveCard',
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      version: '1.3',
      body: [
        {
          type: 'TextBlock',
          text: ' **Mobile Phones**',
          wrap: true,
          spacing: 'None',
          style: 'heading',
          color: 'Attention',
          horizontalAlignment: 'Center',
          size: 'ExtraLarge',
          weight: 'Bolder',
        },
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              width: 'stretch',
              items: [
                {
                  type: 'Image',
                  url:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzaquIDbHpNfm4u3ffh8kLZ-suYoYXx1te7g&usqp=CAU',
                  width: '120px',
                  height: '120px',
                  horizontalAlignment: 'Center',
                },
              ],
            },
            {
              type: 'Column',
              width: 'stretch',
              id: 'sfsfs',
              items: [
                {
                  type: 'ActionSet',
                  actions: [
                    {
                      type: 'Action.Submit',
                      title: 'Samsung',
                      style: 'positive',
                      data: 'Samsung',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              width: 'stretch',
              items: [
                {
                  type: 'Image',
                  url:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS5HrW8dUHrn8JcdjRrohkmYIFRmX_hwASWQ&usqp=CAU',
                  width: '120px',
                  height: '120px',
                  horizontalAlignment: 'Center',
                  selectAction: {
                    type: 'Action.Submit',
                  },
                },
              ],
            },
            {
              type: 'Column',
              width: 'stretch',
              items: [
                {
                  type: 'ActionSet',
                  spacing: 'None',
                  actions: [
                    {
                      type: 'Action.Submit',
                      title: 'Vivo',
                      style: 'destructive',
                      data: 'Vivo',
                      associatedInputs: 'none',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              width: 'stretch',
              items: [
                {
                  type: 'Image',
                  url:
                    'https://m.media-amazon.com/images/I/41xssMLI2DL._AC_SY780_.jpg',
                  width: '120px',
                  height: '120px',
                  horizontalAlignment: 'Center',
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
                      title: 'Apple',
                      style: 'positive',
                      data: 'Apple',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              width: 'stretch',
              items: [
                {
                  type: 'Image',
                  url:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQndm6PQfqrM8vtSLrbzMYJSE7s27aMAj4n4A&usqp=CAU',
                  width: '120px',
                  height: '120px',
                  horizontalAlignment: 'Center',
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
                      title: 'Oppo',
                      style: 'destructive',
                      data: 'Oppo',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              width: 'stretch',
              items: [
                {
                  type: 'Image',
                  url:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpB4Pz4KnB2vyVmr9YLTiDEdJGnKsH_8ifYQ&usqp=CAU',
                  width: '120px',
                  height: '120px',
                  horizontalAlignment: 'Center',
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
                      title: 'Redmi',
                      style: 'positive',
                      data: 'Redmi',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      "backgroundImage": {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd-Gh9bKF8SdBOp2wpEyDGXc1KBrC1EjtJAntcw80pRHjCw1TCRsnOyUC_m1KpsLcGfLo&usqp=CAU"
    }
    })
    await StepContext.context.sendActivity({ attachments: [MobileCard] })
    return {
      status: DialogTurnStatus.waiting,
    }
  }

  async OrderModels(StepContext) {
// console.log('StepContext.result', StepContext.context)
    StepContext.values.info['mobileName'] = StepContext.result
    console.log('StepContext.values.info', StepContext.values.info)
   // changes.push(StepContext.context.activity.text)
    // console.log('...........changes--changes[0]', changes[0])
    var axios = require('axios')

    var config = {
      method: 'Get',
      url: `http://localhost:7000/Mobiles/${StepContext.result}`,
      headers: {},
    }

    try {
      let response = await axios(config)

      let data = response.data[0]

      data.Models = JSON.parse(data.Models)

      StepContext.values.info['models'] = data.Models

      let templatePayload = {
        type: 'AdaptiveCard',
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        version: '1.3',
        body: [
          {
            type: 'TextBlock',
            text: '${Mobiles}',
            wrap: true,
            horizontalAlignment: 'Center',
            fontType: 'Default',
            size: 'ExtraLarge',
            weight: 'Bolder',
            color: 'Attention',
            spacing: 'None',
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
                    horizontalAlignment: 'Center',
                    color: 'Accent',
                    size: 'Large',
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
                    color: 'Accent',
                    size: 'Large',
                    weight: 'Bolder',
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
                        title: 'Take away',

                        data: '${model}',
                        style: 'positive',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        "backgroundImage": {
          "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPNrxA6E1YSthMU5zZK4l54rgOPaOEXIbrcF_cwJzOT3pAVqshvwTjEj1lZUz1-T8n-C0&usqp=CAU"
      }
      }

      var template = new ACData.Template(templatePayload)
      var cardLayout = {
        $root: data,
      }

      var card = template.expand(cardLayout)
      var carddata = CardFactory.adaptiveCard(card)
      await StepContext.context.sendActivity({ attachments: [carddata] })
      return {
        status: DialogTurnStatus.waiting,
      }
    } catch (error) {
      console.log(error)
    }
  }
  async OrderAddress(StepContext) {
   // changes.push(StepContext.context.activity.text)
    // console.log('...........changes--changes[1]', changes[1])
    // console.log('----------------------', StepContext.result)
    StepContext.values.info['modelName'] = StepContext.result

    console.log(
      'hhhhhhhhhhhhhhhhhhh-------------------',
      StepContext.values.info,
    )
    //  console.log(
    //   "StepContext.values.info['modelName']",
    //   StepContext.values.info['modelName'],
    // )
    //console.log('StepContext.values.info*********', StepContext.values.info)

    let models = StepContext.values.info.models
    let modelName = StepContext.values.info.modelName
     // console.log("modelName,models",modelName,models)
    for (let i = 0; i < models.length; i++) {
      if (models[i].model == modelName) {
        StepContext.values.info['Cost'] = StepContext.values.info.models[i].Cost
         // console.log('models[i].Cost',models[i].Cost)
        // changes.push(StepContext.values.info.models[i].Cost)
        // console.log("changes",changes)
         console.log("StepContext.values.info['Cost']",StepContext.values.info['Cost'])
      }
    }

    return await StepContext.prompt('appointment', {
      prompt: 'please Enter your address:',
    })
  }
  async OrderPayment(StepContext) {
    //console.log("lsfhdf",StepContext)
   // changes.push(StepContext.context.activity.text)
    StepContext.values.info['address'] = StepContext.result

   // console.log('...........changes--changes[2]', changes[2])
    //  console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,",StepContext.context.activity.text.prompt)
    //  console.log('...........changes', changes[4])

    return await StepContext.prompt('orderstatus', {
      prompt: 'Payment Type',
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
    //changes.push(StepContext.context.activity.text)
    StepContext.values.info['payment'] = StepContext.result.value
    // console.log('...........changes--changes[3]', changes[3])

    let placeorder = {
      "type": "AdaptiveCard",
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "version": "1.3",
      "backgroundImage": {
          "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Z8yRtbx_7sLTd5T586VbDzJUgFhjGJT-ZA&usqp=CAU"
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
                              "text": StepContext.values.info.mobileName,
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
                              "text":StepContext.values.info.Cost,
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
        changes: [
          StepContext.values.info.modelName,
          StepContext.values.info.mobileName,
          StepContext.values.info.Cost ,
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
    console.log(StepContext.values.info.mobileName)
console.log(StepContext.values.info.modelName)
console.log(StepContext.values.info.Cost)
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
          color: 'Dark',
          height: 'stretch',
          fontType: 'Default',
          spacing: 'Padding',
        },
      ],
      "backgroundImage": {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLxTtoH_PnK4rrMVOEFlh-nauetvZ6deyShw&usqp=CAU"
    }
    })
     await StepContext.context.sendActivity({
      attachments: [welcomeCard],
    })
    return await StepContext.endDialog()
  }
}

module.exports.MobilePurchase = MobilePurchase
