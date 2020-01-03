export const customWidgets = {};

export const content = {
  container: 'row demark',
  items: [
    {widget: 'Text', options: {text: 'Welcome to DSCI'}, name: 'intro'},
    {widget: 'Text', options: {text: 'Where is the building located?'}},
    {widget: 'InputBox', name: 'Location', isRepeatable: true},
    {widget: 'InputBox', name: 'Default', defaultValue: '10'},
    {widget: 'Text', options: {text: 'Do you own this building?'}, name: 'ownBuilding'},
    {widget: 'YesNo', name: 'DoesOwnBuilding'},
    {widget: 'Text', options: {text: 'What policy do you want to buy'}, name: 'policySelectionQuestion'},
    {
      widget: 'Bop',
      name: 'policyName',
      options: {options: ['Business Owner Policy', 'Worker Compensation', 'Building Policy']}
    },
    {
      widget: 'Text',
      options: {text: 'Is your building close to police station?'},
      showOn: "IF(policyName='Business Owner Policy', TRUE, FALSE)",
    },
    {widget: 'YesNoText', name: 'CloseToPoliceStation', showOn: "IF(policyName='Business Owner Policy', TRUE, FALSE)"}
  ]
};
