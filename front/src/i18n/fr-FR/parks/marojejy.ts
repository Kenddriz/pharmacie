export const marojejy = {
  title: 'Parc National Marojejy',
  devise: 'Une biodiversité exceptionnelle',
  image: 'marojejy.jpg',
  localization: {
    title: 'Geography',
    body: 'Le Parc National de Marojejy se situe dans la partie Nord Est de Madagascar.',
    items: [
      {
        label: 'GPS',
        value: 'entre 14° 26′ 06″ de latitude Sud et 49° 42′ 22″ de longitude Est.',
        icon: 'my_location'
      },
      {
        label: 'Région',
        value: 'SAVA',
        icon: 'place'
      },
      {
        label: 'Ville Proche',
        value: 'Sambava et Andapa',
        icon: 'location_city'
      },
      {
        label: 'Superficie',
        value: '55 500 ha',
        icon: 'area_chart'
      }
    ]
  },
  office: {
    title: 'Office',
    bp: 'BP 19 – Ankevaheva ANDAPA 205'
  },
  contact: {
    title: 'Prise de Contact',
    email: 'mrj.anjsud@gmail.com',
    phones: ['+261 32 09 402 16']
  },
  specificities: {
    title: 'Specificities',
    body: [
      'Parc National Terrestre classé Patrimoine Mondial',
      'massif impressionnant',
      'forêt dense humide de basse altitude habitat du Propithecus candidus ou Simpona fotsy, des palmiers et des Ptéridophytes',
      'forêt secondaire de basse altitude',
      'forêt dense humide de montagne, brousse éricoïde.'
    ]
  },
  habitat: {
    title: 'Habitat et topographie',
    body: [
      {
        title: 'Hydrographie',
        icon: 'water',
        description: 'Les montagnes drainent plusieurs bassins versants dont celui du fleuve Lokoho.' +
          'Au total, il dispose 11 cours d’eau prennant source à l’intérieur du Parc.'
      },
      {
        title: 'Altitude',
        icon: 'landscape',
        description: 'Une chaîne de montagnes culminant à une altitude de 2 132 m'
      },
      {
        title: 'Climat',
        icon: 'cloud',
        description: 'Le climat est de type tropical humide. Les pluies tombent mensuellement sur le versant sud de la montagne.'
      },
      {
        title: 'Relief',
        icon: 'fas fa-mountain',
        description: 'Reliefs forestiers accidentés de forme complexe avec des crêtes et des pentes raides et irrégulières.',
      }
    ]
  },
  //Environments
  biodiversity: {
    title: 'Biodiversité',
    body: [
      {
        title: 'Paysage',
        descriptions: [
          'Découvrir le sommet à 2 132 m d’altitude est une réelle aventure sportive.',
          'Cascade de Humbert environ 40m de hauteur et piscine naturelle 50cm à 4m de profondeur.'
        ]
      },
      {
        title: 'Répartition des faunes du Parc',
        descriptions: [
          '25 espèces de micromammifères',
          '11 espèces de lémuriens',
          '149 espèces de reptiles et amphibiens',
          '72 espèces d’oiseaux.'
        ],
        /*table: [
          {
            title: 'Les espèces phares les plus visibles',
            columns: JSON.stringify([
              {
                name: 'usual',
                label: 'Nom usuel',
                align: 'left',
                field: 'usual',
                sortable: true
              },
              {
                name: 'scientific',
                label: 'Nom scrientifique',
                align: 'left',
                field: 'scientific',
                sortable: true
              },
              {
                name: 'description',
                label: 'Description',
                align: 'left',
                field: 'description',
                sortable: true
              },
              {
                name: 'place',
                label: 'Place',
                align: 'left',
                field: 'place',
                sortable: true
              }
            ])
          }
        ]*/
      },
      {
        title: 'Répartition des flores du Parc',
        descriptions:  [
          '350 espèces de Ptéridophytes',
          '50 espèces de palmiers'
        ],
      }
    ]
  },
  notice: [
    {
      title: 'Brève historique',
      body: [
        {
          label: '1952',
          value: 'Classée Réserve Naturelle Intégrale'
        },
        {
          label: '1998',
          value: 'puis Parc National'
        },
        {
          label: '2007',
          value: ' Patrimoine Mondial'
        }
      ]
    },
    {
      title: 'Population',
      body: [
        {
          label: 'Ethnie dominante',
          value: 'Tsimihety'
        },
        {
          label: 'Autres',
          value: 'Merina - Betsimisaraka - Betsileo'
        }
      ]
    },
    {
      title: 'Visite idéale',
      body: [
        {
          label: 'Toute l\'année',
          value: 'Heures d\'ouvertures: 08h - 16h'
        },
        {
          label: 'Comment s\'y rendre ?',
          value: 'D’Antananarivo sur la RN4 puis prendre la RN6 jusqu’à Ambilobe et bifurquer sur la route menant vers Vohémar. Route non praticable durant la saison de pluie.'
        }
      ]
    }
  ],

}
