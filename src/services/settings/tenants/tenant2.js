export const customWidgets = {};

export const content = {
  container: 'row demark',
  items: [
    {widget: 'Text', options: {text: 'Welcome to DSCI'}, name: 'intro'},
    {widget: 'Text', options: {text: 'Where is the building located?'}},
    {widget: 'InputBox', name: 'Location', isRepeatable: true},
    {widget: 'Text', options: {text: 'Do you own this building?'}},
    {widget: 'YesNo', name: 'DoesOwnBuilding'},
    {widget: 'Text', options: {text: 'What policy do you want to buy'}},
    {widget: 'Bop', name: 'PolicyName', options: {options: ['Business Owner Policy', 'Worker Compensation', 'Building Policy']}},
    {
      widget: 'Text', options: {text: 'Is your building close to police station?'}, showOn: (data) => {
        return data.Location.length > 1 && data.DoesOwnBuilding === true;
      }
    },
    {
      widget: 'YesNoText', name: 'CloseToPoliceStation', showOn: (data) => {
        return data.Location.length > 1 && data.DoesOwnBuilding === true;
      }
    }
  ]
};
