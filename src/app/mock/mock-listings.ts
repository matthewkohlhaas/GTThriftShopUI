import {Listing} from '../model/listing';
import {MOCK_USERS} from './mock-users';

export const MOCK_LISTINGS: Listing[] = [
  {
    name: 'Samsung 55\' 4K LED TV',
    description: 'Used it for about a year. Still in really good condition. Put it back in the original box.',
    price: 500,
    imageUrl: 'https://i.ebayimg.com/images/g/MPkAAOSwIFtaCffc/s-l1600.jpg',
    user: MOCK_USERS[1],
  }, {
    name: 'Gaming Chair',
    description: 'Really comfortable pc gaming chair. I\'ve no room for it in my new apartment, so it\'s gotta go.',
    price: 60,
    imageUrl: 'https://i.ebayimg.com/images/g/u5wAAOSwfrxZxbA7/s-l1600.jpg',
    user: MOCK_USERS[2],
  }, {
    name: 'Keurig Coffee Maker',
    description: 'Brand new coffee maker! I never opened it. It\'s still its shrink wrapped package.',
    price: 34.5,
    imageUrl: 'https://i.ebayimg.com/images/g/8E0AAOSwaEhZI4Dc/s-l1600.jpg',
    user: MOCK_USERS[4],
  }, {
    name: 'Buzz Bobblehead',
    description: 'A buzz bobblehead. Does not come with the box.',
    price: 24,
    imageUrl: 'https://i.ebayimg.com/images/g/1woAAOSw6b9Z312M/s-l1600.jpg',
    user: MOCK_USERS[3],
  }, {
    name: 'Georgia Tech T-Shirt',
    description: 'A vintage Georgia Tech T-shirt from the late 70\'s. I found it in th back of my closet, so it\'s'
      + ' probably only been worn once or twice.',
    price: 19,
    imageUrl: 'https://i.ebayimg.com/images/g/~nQAAOSwOgdYoGjk/s-l1600.jpg',
    user: MOCK_USERS[0],
  }, {
    name: 'ACC Basketball',
    description: 'An old basketball with ACC teams printed on it. Yeah, the national champs are right there on the top.'
      + ' Also, the team that beat them is featured right below. Go Jackets!',
    price: 8,
    imageUrl: 'https://i.ebayimg.com/images/g/AjUAAOSwdW9aCN5R/s-l1600.jpg',
    user: MOCK_USERS[2],
  },
];
