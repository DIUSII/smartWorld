import createMenu from '../../components/menu/menu';
import './homePage.scss';
var menu = createMenu(['Главная','Блог'], 'menu');
document.body.appendChild(menu);
 
console.log('in index.js')
