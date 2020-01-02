export const customWidgets = {};
//TODO : rename name to tag
export const content = {
  container: 'row demark',
  items: [
    {
      widget: 'GoogleAssist', name: 'googleAssist', options: {
        exportNames: {
          place_id: 'googlePlaceId',
          name: 'name',
          formatted_address: 'address',
          photosUrl: 'googleImages',
          rating: 'googleRating'
        }
      }
    },
    {
      widget: 'GoogleRating', name: 'googleRating', showOn: (data) => {
        return data.name !== null
      }
    },
    {
      widget: 'GoogleImages', name: 'googleImages', showOn: (data) => {
        return data.name !== null
      }
    },
    {
      widget: 'Text', options: {text: 'Business name'}, name: 'businessName', showOn: (data) => {
        return data.name !== null
      }
    },
    {
      widget: 'InputBox', name: 'name', showOn: (data) => {
        return data.name !== null
      }
    },
    {
      widget: 'Text', options: {text: 'Address'}, name: 'businessAddress', showOn: (data) => {
        return data.name !== null
      }
    },
    {
      widget: 'InputBox', name: 'address', showOn: (data) => {
        return data.name !== null
      }
    }
  ]
};
