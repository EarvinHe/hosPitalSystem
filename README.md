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

删除功能：有单个删除和批量删除，批量删除很特别，相比于单个删除只需要发一次根据id删除就行，批量删除需要借助es6中的foreEach()方法遍历循环删除，实际上是多次调用单个删除的方法。部分代码如下：
    ```   
       // 批量删除  
       deleteSomeDepts() {     
          try {     
           this.multipleSelection.forEach(async (item) => {     
             await this.$store.dispatch("deleteDept", item.deptId);    
             this.getData();   
           });      
         } catch (error) {     
           alert(error.msg);     
         }   
         },   ``` 
         
   另外就是修改科室功能了，同样是跳转路由，不同的是要带参，将id通过路由带给修改页面，修改页面接受id并通过此id查询原本的数据先展示出来，然后再进行修改，将修改后的数据通过v-model绑定通过请求发送给后台进行修改。
   ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/7bf3f833-945e-4f3e-b92a-22194a02bbd9)

   
#### （5）药品管理：
   之后我们做的是药品管理模块，相对来说它相对独立于其他模块功能之外，但功能比较多，有药品展示（查询），添加药品，删除药品，编辑药品（根据id修改药品），药品的上架与下架（跟药品的销售状态挂钩），药品的审核（共有四种状态，具体看开发文档）
   ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/5bb5dfc4-6cf8-4caf-96be-1bd2a45250f4)
   ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/19891588-df90-4997-879e-20244d3c7756)
   
   添加，删除和修改不再赘述，与科室的类似，不同的可能只是参数和请求路径不同，值得注意的是，新添加的药品的销售状态和审核状态一定是等待上架（下架状态）和等待提交审核的，而且，一个很重要的逻辑是，当新添加完药品后，它的销售状态是只读的，其点击按钮是无法点击触发任何事件的，并且，不论审核状态是啥，只要它不是审核通过，都无法将其改为上架状态（即显示等待下架状态），另外，审核状态出了提交审核，其它三种也是只读状态。以下：
   ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/fa44e5ff-2c4c-4392-8797-52320097005f)
   审核药品管理页，详情，审核页自然另有单独的页面：
   ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/e2595279-3e47-41a0-b4fe-de223ee7febc)
   ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/4fb9ef8c-3996-4a2f-9154-96d53f9118e8)
   ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/6924b8d9-ec1b-47b7-9012-72a0ee250b40)
   查看详情自然与修改差不多，无论是采取从父组件通过路由传参还是在子组件发请求都能把数据带过去，详情的数据自然是只读的。
   审核页修改审核状态，页面挂在时将药品名和生产商带过去显示，是否通过和意见由管理员（你自己）修改后返回审核管理页面，通过与不通过都将显示在一开始的药品管理页。

#### （6）患者管理：
   展示数据，添加，修改，删除无需多说，跟着开发文档发请求，该传参的地方传参就行了，不同的是，编辑我用了el-dialog的组件做了一个弹出框，这样便不用再路由跳转页面了
   ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/1cc123d8-9660-4941-ae96-614824f47a49)
   
   ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/5868db79-a24d-4a47-ae7b-e7bd9f5cc754)
   
   ![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/da6968da-9824-4851-9f19-7802ebcd2ea4)
   其次是挂号和下载诊断，这两个操作都与分诊管理模块相关，挂号是发请求将患者信息带给分诊管理的分诊科室（取决于患者挂的是哪一科室，也有可能是多个科室），而
下载诊断需要等分诊中的每个科室诊断结束后才能发送下载请求，以下是下载诊断，同样是弹出框：
![image](https://github.com/EarvinHe/hospitalSystem/assets/140814338/393d70b9-5856-4764-9b10-d97f92baf2a4)

点击完成会下载pdf格式的诊断书（这部分一定要和分诊模块结合起来看，不然看不明白）

####






        
