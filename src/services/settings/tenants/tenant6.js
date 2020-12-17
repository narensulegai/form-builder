export const customWidgets = {
  GooglePlaces: {
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
        widget: 'Text', name: 'googleRating', options: {text: 'User rating : {{googleRating}} of 5'},
        showOn: "IF(address=NULL, FALSE, TRUE)"
      },
      {widget: 'GoogleImages', name: 'googleImages', showOn: "IF(address=NULL, FALSE, TRUE)"},
      {widget: 'InputBox', name: 'name', options: {label: 'Building name'}, showOn: "IF(address=NULL, FALSE, TRUE)"},
      {widget: 'InputBox', name: 'address', options: {label: 'Address'}, showOn: "IF(address=NULL, FALSE, TRUE)"}
    ]
  },
  BuildingList: {
    container: 'demark',
    items: [{
      widget: 'GooglePlaces', name: 'building'
    }]
  },
  BuildingWidget: {
    items: [{
      content: {
        items: [
          {
            name: 'address',
            widget: 'Summary',
            content: {
              items: [
                {
                  content: {
                    container: 'col',
                    items: [
                      {name: 'streetAddress', widget: 'InputBox', options: {label: 'Street Address'}},
                      {name: 'suite', widget: 'InputBox', options: {label: 'Suite'}},
                      {name: 'city', widget: 'InputBox', options: {label: 'City'}}
                    ]
                  }
                },
                {
                  content: {
                    container: 'col',
                    items: [
                      {name: 'state', widget: 'InputBox', options: {label: 'State'}},
                      {name: 'zipCode', widget: 'InputBox', options: {label: 'Zip Code'}}
                    ]
                  }
                }
              ]
            },
            options: {
              summary: [
                {name: 'streetAddress', label: 'Street Address'},
                {name: 'suite', label: 'Suite'},
                {name: 'city', label: 'City'},
                {name: 'zipCode', label: 'Zipcode'}
              ],
              validate: {}
            }
          },
        ]
      }
    }]
  },
  LocationWidget: {
    items: [
      {name: 'Location', widget: 'InputBox', options: {label: 'Location'}},
      {name: 'Building', widget: 'BuildingWidget', options: {}, isRepeatable: true},
    ]
  },
  LOBSelection: {
    items: [
      {widget: 'Text', options: {text: 'Do you own this building?'}, name: 'ownBuilding'},
      {widget: 'YesNo', name: 'doesOwnBuilding'},
      {widget: 'Text', options: {text: 'What policy do you want to buy?'}, name: 'policySelectionQuestion'},
      {
        widget: 'Bop', name: 'policyName', options: {
          options: ['Business Owner Policy', 'Worker Compensation', 'Building Policy']
        }
      },
      {
        widget: 'Text', options: {text: 'Is your building close to police station?'},
        showOn: "IF(policyName='Business Owner Policy', TRUE, FALSE)",
      },
      {widget: 'YesNoText', name: 'CloseToPoliceStation', showOn: "IF(policyName='Business Owner Policy', TRUE, FALSE)"}
    ]
  }
};

export const content = {
  items: [{
    widget: 'Journey', name: 'journey',
    options: {
      pages: [
        {
          title:'Business Details',
          name: 'Page1',
          content: {
            container: 'demark',
            items: [{widget: 'GooglePlaces', name: 'googlePlaces'}]
          },
          validate: [
            {name: 'googlePlaces.name', errorMessage: 'Business name cannot be empty'},
          ]
        },
        {
          title:'Select LOB',
          name: 'Page2',
          content: {
            container: 'demark',
            items: [{name: 'lobSelection', widget: 'LOBSelection'}]
          },
          validate: []
        },
        {
          title:'Buildings',
          name: 'Page3',
          content: {
            container: 'demark',
            items: [{name: 'buildingList', widget: 'BuildingList', isRepeatable: true}]
          },
          validate: []
        },
        {
          title:'Locations',
          name: 'Page4',
          content: {
            container: 'demark',
            items: [{name: 'locationWithBuildings', widget: 'LocationWidget', isRepeatable: true}]
          },
          validate: []
        }
      ]
    }
  }]
};
