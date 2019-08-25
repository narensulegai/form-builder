export const content = {
  name: 'main',
  container: 'row',
  items: [
    {
      widget: 'NonEmptyInputBox',
      options: {label: 'Name'}
    },
    {
      content: {
        name: 'columns',
        container: 'col',
        items: [
          {
            widget: 'NonEmptyInputBox',
            options: {label: 'Name'}
          },
          {
            widget: 'EmailInputBox',
            options: {label: 'Email'}
          }
        ]
      }
    }
  ]
};

