export const customWidgets = {
  BuildingWidget: {
    container: 'row',
    items: [
      {
        content: {
          renderer: {
            type: 'Form', options: {
              validate: ['BuildingDescription'],
              label: 'Building Summary',
              summary: [
                {label: 'Street Address', value: 'StreetAddress'},
                {label: 'Suite', value: 'Suite'},
                {label: 'City', value: 'City'},
                {label: 'Zip Code', value: 'ZipCode'},
                {label: 'State', value: 'State'}
              ]
            }
          },
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
                  {name: 'City', widget: 'InputBox', options: {label: 'City'}},
                ]
              }
            },
            {
              content: {
                container: 'col',
                items: [
                  {
                    name: 'State', widget: 'InputBox', options: {label: 'State'}
                  },
                  {
                    name: 'ZipCode', widget: 'InputBox', options: {label: 'Zip Code'}
                  }
                ]
              }
            },
            {
              content: {
                container: 'row',
                items: [
                  {name:'Q1Text', widget: 'Question', options: {text: 'Q1. Is your building close to police station?'}, showOn: (data) => {
                      return data.BuildingDescription !== null;
                    }},
                  {name: 'Q1', widget: 'YesNo', options: {text: 'Q1. Is your building close to police station?'}, showOn: (data) => {
                      return data.BuildingDescription !== null;
                    }}
                ]
              }
            }
          ]
        }
      }
    ]
  }
};

export const content = {
  container: 'row',
  items: [{
    content: {
      container: 'col',
      items: [
        {name: 'BuildingDescription', widget: 'BuildingWidget', isRepeatable: true}
      ]
    }
  }]
};
