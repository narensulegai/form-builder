export const customWidgets = {
  BuildingWidget: {
    container: 'row',
    items: [{
      content: {
        container: 'row',
        items: [
          {name: 'BuildingDescription', widget: 'InputBox', options: {label: 'Building description'}},
          {
            name: 'Address',
            widget: 'AddressSummary',
            content: {
              container: 'row',
              items: [
                {
                  content: {
                    container: 'col',
                    items: [
                      {name: 'streetAddress', widget: 'InputBox', options: {label: 'Street Address'}},
                      {name: 'suite', widget: 'InputBox', options: {label: 'Suite'}},
                      {name: 'city', widget: 'InputBox', options: {label: 'City'}},
                    ]
                  }
                },
                {
                  content: {
                    container: 'col',
                    items: [
                      {name: 'state', widget: 'InputBox', options: {label: 'State'}},
                      {name: 'zipCode', widget: 'InputBox', options: {label: 'Zip Code'}}
                    ]
                  }
                }
              ]
            },
            options: {
              summary: [
                {name: 'streetAddress', label: 'Street Address'},
                {name: 'suite', label: 'Suite'},
                {name: 'city', label: 'City'},
                {name: 'zipCode', label: 'Zipcode'}
              ],
              validate: {}
            }
          },
        ]
      }
    }]
  },
  LocationWidget: {
    container: 'row',
    items: [
      {name: 'Location', widget: 'InputBox', options: {label: 'Location'}},
      {name: 'Building', widget: 'BuildingWidget', options: {}, isRepeatable: true},
    ]
  },
};

export const content = {
  container: 'row demark',
  items: [{name: 'LocationWithBuildings', widget: 'LocationWidget', isRepeatable: true}]
};
