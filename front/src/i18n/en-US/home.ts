const dateFormat = {
  dateTime: 'YYYY-MM-DD T HH:mm:ss',
  date: 'YYYY/MM/DD',
  inputMaskFormat: '####/##/##',
  timeOnly: 'HH:mm:ss'
};

const languages = [
  {label: 'English', value: 'en-US'},
  {label: 'French', value: 'fr-FR'}
]

const menuBar = [
  {label: 'Parcs', to: 'parcs', icon: 'parks', children: []},
  {label: 'Collections', to: 'collections', icon: 'collections', children: []},
  {label: 'Hotels & Restaurent', to: 'hotels', icon: 'hotel', children: []},
  {label: 'Actualites', to: 'actualite', icon: 'far fa-newspaper', children: []},
  {label: 'Contact', to: 'contact', icon: 'contact_page', children: []},
  {label: 'About', to: 'about', icon: 'info', children: []},
]

const nature = {
  title: 'Discover Madagascar\'s Environmental Diversities',
  label: 'Go To Collections',
  body: [
    {
      id: '0',
      title: 'Animals',
      icon: 'fas fa-dove',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '1',
      title: 'Forests',
      icon: 'fas fa-tree',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '2',
      title: 'Humans',
      icon: 'nature_people',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '3',
      title: 'Plants',
      icon: 'fas fa-seedling',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '4',
      title: 'Rocks',
      icon: 'fas fa-mountain',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '5',
      title: 'Water',
      icon: 'fas fa-water',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    }

  ]
}

export const footer = {
  about: {
    title: 'About us',
    description: 'loremipsum'
  },
  contact: {
    title: 'Contact us',
  },
  welcome: 'You Are In Madagascar Thanks to Madavoary',
}

export default {
  dateFormat,
  languages,
  menuBar,
  nature,
  welcome: 'makes the world discover our environment',
  footer
}
