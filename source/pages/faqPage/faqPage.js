import createMenu from '../../components/menu/menu';
import './faqPage.scss';
var menu = createMenu(['Главная','Блог'], 'menu');
document.body.appendChild(menu);
 
console.log('in blog.js')