export const customWidgets = {
  BuildingWidget: {
    container: 'row',
    items: [
      {
        content: {
          container: 'row',
          items: [
            {name: 'BuildingDescription', widget: 'InputBox', options: {label: 'Building description'}},
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
                  {name: 'State', widget: 'InputBox', options: {label: 'State'}},
                  {name: 'ZipCode', widget: 'InputBox', options: {label: 'Zip Code'}}
                ]
              }
            },
            {
              content: {
                container: 'row',
                items: [
                  {
                    name: 'Q1Text',
                    widget: 'Question',
                    options: {text: 'Q1. Is your building close to hospital?'},
                    showOn: (data) => {
                      return data.BuildingDescription !== null;
                    }
                  },
                  {
                    name: 'Q1', widget: 'YesNo', showOn: (data) => {
                      return data.BuildingDescription !== null;
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
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
