export const customWidgets = {
  Summary: {
    container: 'col',
    items: [
      {
        name: 'BuildingDescription', widget: 'InputBox', options: {label: 'Building description'}
      }
    ]
  }
};

export const content1 = {
  container: 'col',
  items: [
    {name: 'CustomWidgetKey', widget: 'Summary', options: {label: 'Street Address'}},
    {name: 'CustomWidgetKey1', widget: 'Summary', options: {label: 'Street Address'}},
  ]
};

export const content = {
  container: 'row',
  items: [
    {
      content: {
        container: 'col summary',
        items: [{
          name: 'BuildingSummary',
          widget: 'BuildingSummary',
          options: {
            label: 'Building Summary',
            data: [
              {label: 'Street Address', value: 'StreetAddress'},
              {label: 'Suite', value: 'Suite'}
            ]
          }
        }]
      }
    },
    {
      content: {
        renderer: {type: 'Form', options: {validate: ['BuildingDescription']}},
        container: 'row',
        items: [
          {
            content: {
              container: 'col',
              items: [
                {name: 'BuildingDescription', widget: 'InputBox', options: {label: 'Building description'}}
              ]
            }
          },
          {
            content: {
              container: 'col',
              items: [
                {name: 'StreetAddress', widget: 'InputBox', options: {label: 'Street Address'}},
                {name: 'Suite', widget: 'InputBox', options: {label: 'Suite'}},
                {name: 'City', widget: 'InputBox', options: {label: 'City'}}
              ]
            }
          },
          {
            content: {
              container: 'col',
              items: [
                {name: 'State', widget: 'InputBox', options: {label: 'State'}},
                {name: 'ZipCode', widget: 'InputBox', options: {label: 'Zip Code'}}
              ]
            }
          }
        ]
      }
    }
  ]
};