export const customWidgets = {};

export const content = {
  container: 'row',
  items: [{
    content: {
      container: 'row',
      items: [
        {widget: 'Text', options: {text: 'Where is the building located?'}},
        {widget: 'InputBox', name: 'Location'},
        {widget: 'Text', options: {text: 'Do you own this building?'}},
        {widget: 'YesNo', name: 'DoesOwnBuilding'},
        {
          widget: 'Text', options: {text: 'Is your building close to police station?'}, showOn: (data) => {
            return data.DoesOwnBuilding === true;
          }
        },
        {
          widget: 'YesNo', name: 'CloseToPoliceStation', showOn: (data) => {
            return data.DoesOwnBuilding === true;
          }
        },
      ]
    }
  }]
};
