This is a Official website home page.这是一个官网首页

Because of no database，I simulated the database through json file.因为没有数据库，所以我通过json文件代替

Output data by Ajax requestion.通过AJax请求输出数据

look index_2.js,you can konw this.查看index_2.js,就可以看到我是怎么做的。

And you can browse this page by https://xiaofeihui.github.io/indexdoor/index.html.这是预览地址

因为没有后台处理程序，不能通过传递参数对数据进行筛选，所以我在js函数中通过遍历数据，通过函数传入的参数，
在返回函数中对比key值在前台进行数据筛选，通过与js函数优化，通过参数选择让多种请求封装成同一个函数，通过不同参数调用即可
