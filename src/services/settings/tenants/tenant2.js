export const customWidgets = {};

export const content = {
  container: 'row demark',
  items: [
    {widget: 'Text', options: {text: 'Welcome to this JSON Form builder'}, name: 'intro'},
    {widget: 'Text', options: {text: 'Where is your house located?'}},
    {widget: 'InputBox', name: 'Location', isRepeatable: true},
    {widget: 'InputBox', name: 'Default', defaultValue: '10'},
    {widget: 'Text', options: {text: 'Do you own this house?'}, name: 'ownBuilding'},
    {widget: 'YesNo', name: 'DoesOwnBuilding'},
    {widget: 'Text', options: {text: 'What option do you want to choose'}, name: 'policySelectionQuestion'},
    {
      widget: 'Bop',
      name: 'policyName',
      options: {options: ['Option A', 'Option B', 'Option C']}
    },
    {
      widget: 'Text',
      options: {text: 'Is your building close to police station?'},
      showOn: "IF(policyName='Option A', TRUE, FALSE)",
    },
    {widget: 'YesNoText', name: 'CloseToPoliceStation', showOn: "IF(policyName='Option A', TRUE, FALSE)"}
  ]
};
