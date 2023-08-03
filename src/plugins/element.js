import Vue from 'vue'
// 引入elment-ui
// 完整引入，但为了打包体积更轻，一般采用按需引入
// import ElementUI from 'element-ui';
/* import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI); */

// 按需引入
import { Button,Form,Input,Checkbox,FormItem,Message,
         Menu,Submenu,MenuItemGroup,MenuItem,Select,
         Option,Col,DatePicker,RadioGroup,Radio,Table,TableColumn,
         Pagination,RadioButton,Dialog,Card,Upload,Carousel,CarouselItem,Drawer,Divider } from 'element-ui';
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(FormItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(RadioButton)
Vue.use(Dialog)
Vue.use(Card)
Vue.use(Upload)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Drawer)
Vue.use(Divider)
Vue.prototype.$message = Message;

export default Element
