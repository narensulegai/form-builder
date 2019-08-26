export const content = {
  name: 'main',
  container: 'row',
  items: [
    {
      widget: 'NonEmptyInputBox',
      options: {label: 'Name'},
    },
    {
      content: {
        name: 'columns',
        container: 'col',
        items: [
          {
            widget: 'NonEmptyInputBox',
            options: {label: 'Name'},
            hideIf: (data) => {
              return !data.main[0];
            }
          }
        ]
      }
    }
  ]
};

export const data = {
  main: ['', {columns: ['def']}]
};