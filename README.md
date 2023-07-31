# hosipitalsystem   医院管理系统（前端）

## 一、使用的框架，技术栈：
   ####  (1)   vue@2.6.14, vuex@3.6.2，elenentUi@2.4.5



![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/eb8c9b2d-2c22-46c9-85e1-a279e35be6fa)

####  (2)  如上图为项目打开后的首页，根据导航栏的显示，将整个项目依次分为了 七个功能模块，包括首页内容部分出现的值班表，通知栏，轮播图等。另外六个模块分别为上图所示导航栏中的其他六项，具体将在每一个模块细讲。
#### （3）另外，我们将导航栏置于<Header>组件中，将登录和注册置于<HeaderTop>组件中，将这两个组件共同置于compenents文件夹中，作为所有组件共有的组件。
#### （4）项目作为Earvin 我第一个独立操刀的vue2项目，功能简单，复杂度不高，但仍存在诸多需要优化的地方，后续随着实力的增长逐一优化哈哈哈哈哈。

## 二、组件与功能：
#### （1）项目的构建：
   用vscode或者cmd创建一个vue2项目，添加需要的依赖，以及elementui，根据后端提供的开发文档，  在views和compenents中初步划分好各个组件模块，在入口文件中引入需要的依赖如elementUi，less等。
配置好api文件，api文件中有两个文件，一个是requets，  用来二次分装axios请求，基础路径，  以及请求和响应拦截器。另一个是index.js，在此写axios请求。
在vue.config文件中配置好跨域。
#### （2）登录：
   项目的创建除了基本的的vue create .... 和引入各种包，如vue-router,vuex,elementui这些基本操作以外，  之后要做的第一件事就是登录模块，专门在views中添加一个login文件夹，在里面添加一个login.vue文件，  按照需求，我们用elementui和css样式将登录页面实现(之所以验证码图片未能显示，在于后端的权限功能还未完成，后续会完善):
  ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/3d4e969b-9e54-4589-9979-ea59722f43d2)
        
        写好基本页面后，便是登录功能的实现：我们拿到后端提供的登录接口，先在api文件夹中的index.js文件中编写此登录请求，然后在store仓库中新建一个user小仓库，编写actions方法（此类似过程后续不再赘述，无非就是发起请求的三连环，有的多两步操作（mutations，getters）罢了，具体可以视要求而变更），在login.vue页面中派发$store.dispatch，登陆成功返回home首页，失败返回错误信息。
#### （3）注册
        页面的样式编写自不必多说，同样在首页或者登录框中点击注册时弹出一个新页面用于新用户注册，在form表单中用双向绑定v-model获取填入的信息，在选择科室和选择文件那分别发起查询科室的请求和选择文件的请求，点击注册发起请求将其提交给后端，后端将其添加到数据库，返回注册成功的信息；以下为页面：
  ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/8327d513-efbe-4389-b417-c3f251a9c64b)

#### （4）科室模块：
        我们放弃有限完成首页模块而选择有限科室模块，原因是，后续很多操作需要用到查询科室，以及根据科室id进行某些查询，不可能每此遇到类似的就重新发一个查询请求，更好的方式应该是优先完成该模块，此后再需要数据，要么路由传参，要么直接从相对应的vuex中的dept科室小仓库拿数据即可。以下：

![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/21b2c0e2-2e74-4ec4-a1d0-db9a89aff83c)
        当点击添加科室时跳转路由，到添加页面，同样是form表单，双向绑定获取数据，向后台发送添加请求，添加完成返回科室管理页面，组件挂在时重新触发查询请求将新的数据也展示在页面上；以下：

   ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/c7174246-d3df-4fb7-a3ae-efb363e1ec40)


  
![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/0645c516-26e0-41aa-a7fe-e4f7e0ae4def)
        


        
