export class ConstantUtils {

  public static SORT_OBJECTS: object[] = [
    {text: 'Price: Low to High', params: {sort: 'price', direction: 'ascending'}},
    {text: 'Price: High to Low', params: {sort: 'price', direction: 'descending'}},
    {text: 'Most Recent', params: {sort: 'createdAt', direction: 'descending'}},
    {text: 'Least Recent', params: {sort: 'createdAt', direction: 'ascending'}}
  ];

  public static CATEGORY_OBJECTS: object[] = [
    {text: 'All', value: 'all'},
    {text: 'Miscellaneous', value: 'miscellaneous'},
    {text: 'Appliances', value: 'appliances'},
    {text: 'Books', value: 'books'},
    {text: 'Cars', value: 'cars'},
    {text: 'Clothing', value: 'clothing'},
    {text: 'Electronics', value: 'electronics'},
    {text: 'Furniture', value: 'furniture'},
    {text: 'Home Goods', value: 'home'},
    {text: 'Housing', value: 'housing'},
    {text: 'School', value: 'school'},
    {text: 'Services', value: 'services'},
    {text: 'Sports/Outdoors', value: 'sports-outdoors'},
  ];

  public static DEFAULT_CATEGORY = ConstantUtils.CATEGORY_OBJECTS[1];

}
