const dateFormat = {
  dateTime: 'DD-MM-YYYY T HH:mm:ss',
  date: 'DD/MM/YYYY',
  inputMaskFormat: '##/##/####',
  timeOnly: 'HH:mm:ss'
};

const languages = [
  {label: 'Anglais', value: 'en-US'},
  {label: 'Français', value: 'fr-FR'}
]

const menuBar = [
  {label: 'Parcs', to: 'parcs', icon: 'parks', children: []},
  {label: 'Collections', to: 'collections', icon: 'collections', children: []},
  {label: 'Hotels & Restaurent', to: 'hotels', icon: 'hotel', children: []},
  {label: 'Actualites', to: 'actualite', icon: 'far fa-newspaper', children: []},
  {label: 'Contact', to: 'contact', icon: 'contact_page', children: []},
  {label: 'About', to: 'about', icon: 'info', children: []},
]

export const nature = {
  title: 'Découvrer Les Diversités Environnementaux de Madagascar',
  label: 'Aller aux Collections',
  body: [

    {
      id: '0',
      title: 'Animaux',
      icon: 'fas fa-dove',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '5',
      title: 'Eaux',
      icon: 'fas fa-water',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '1',
      title: 'Forêts',
      icon: 'fas fa-tree',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '2',
      title: 'Humains',
      icon: 'nature_people',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '3',
      title: 'Végétaux',
      icon: 'fas fa-seedling',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '4',
      title: 'Roches',
      icon: 'fas fa-mountain',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    }

  ]
}

export const footer = {
  about: {
    title: 'A propos de nous',
    description: 'loremipsum'
  },
  contact: {
    title: 'Contactez-nous',
  },
  welcome: 'Vous êtes à Madagascar Grâce à Madavoary'
}

export default {
  dateFormat,
  languages,
  menuBar,
  nature,
  welcome: 'permet au monde de découvrir notre environnement',
  footer
}
