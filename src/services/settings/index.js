export const content = {
  container: 'row',
  items: [
    {
      name: 'email1',
      widget: 'EmailInputBox',
      options: {label: 'Email'},
    },
    {
      content: {
        container: 'col',
        items: [
          {
            name: 'name1',
            widget: 'NonEmptyInputBox',
            options: {label: 'Name'},
            showOn: ({email1}) => {
              return email1 !== null;
            }
          }
        ]
      }
    }
  ]
};