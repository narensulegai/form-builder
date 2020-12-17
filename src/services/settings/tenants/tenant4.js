export const customWidgets = {
  LocationWidget: {
    container: 'row',
    items: [
      {name: 'Location', widget: 'InputBox', options: {label: 'Location'}},
    ]
  },
};

export const content = {
  container: 'row',
  items: [{
    name: 'Journey1', widget: 'Journey',
    options: {
      pages: [
        {
          name: 'Page1',
          content: {
            container: 'row', items:
              [
                {widget: 'InputBox', name: 'a'},
                {widget: 'InputBox', name: 'b'}
              ]
          },
          validate: [
            {name: 'a', errorMessage: 'a Cannot be empty'},
            {name: 'b', errorMessage: 'b Cannot be empty'}
          ]
        },
        {
          name: 'Page2',
          content: {
            container: 'row', items:
              [
                {widget: 'InputBox', name: 'c'},
                {widget: 'InputBox', name: 'd'}
              ]
          },
          validate: [
            {name: 'c', errorMessage: 'Cannot be empty'},
            {name: 'd', errorMessage: 'Cannot be empty'}
          ]
        }
      ]
    }
  }]
};
