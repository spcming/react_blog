**使用这个文件的两个必要条件**

1. 你的程序员中使用了`Ant Design`UI库，因为它里边的导航部分，使用了`antd`的`Anchor`组件
2. 安装`lodash`模块，这个可以直接使用`yarn add lodash`来安装

上面两个条件满足后，你可以把文件`tocify.tsx`拷贝到你的项目里了，我这里放到了`/blog/components`文件夹下了，把它视为一种自定义组件。

tocify.tsx文件

```js
import React from 'react';
import { Anchor } from 'antd';
import { last } from 'lodash';

const { Link } = Anchor;

export interface TocItem {
  anchor: string;
  level: number;
  text: string;
  children?: TocItem[];
}

export type TocItems = TocItem[]; // TOC目录树结构

export default class Tocify {
  tocItems: TocItems = [];

  index: number = 0;

  constructor() {
    this.tocItems = [];
    this.index = 0;
  }

  add(text: string, level: number) {
    const anchor = `toc${level}${++this.index}`;
    const item = { anchor, level, text };
    const items = this.tocItems;

    if (items.length === 0) { // 第一个 item 直接 push
      items.push(item);
    } else {
      let lastItem = last(items) as TocItem; // 最后一个 item

      if (item.level > lastItem.level) { // item 是 lastItem 的 children
        for (let i = lastItem.level + 1; i <= 2; i++) {
          const { children } = lastItem;
          if (!children) { // 如果 children 不存在
            lastItem.children = [item];
            break;
          }

          lastItem = last(children) as TocItem; // 重置 lastItem 为 children 的最后一个 item

          if (item.level <= lastItem.level) { // item level 小于或等于 lastItem level 都视为与 children 同级
            children.push(item);
            break;
          }
        }
      } else { // 置于最顶级
        items.push(item);
      }
    }

    return anchor;
  }

  reset = () => {
    this.tocItems = [];
    this.index = 0;
  };

  renderToc(items: TocItem[]) { // 递归 render
    return items.map(item => (
      <Link key={item.anchor} href={`#${item.anchor}`} title={item.text}>
        {item.children && this.renderToc(item.children)}
      </Link>
    ));
  }

  render() {
    return (
      <Anchor affix showInkInFixed>
         {this.renderToc(this.tocItems)}
      </Anchor>
    );
  }
}
```

其实这个文件也很简单，如果JavaScript基础没问题是完全可以看明白的。

[使用`tocify.tsx`生成文章目录](https://jspang.com/detailed?id=52#toc378)

```js
import Tocify from '../components/tocify.tsx'
```

引入后，需要对`marked`的渲染进行自定义，这时候需要设置`renderer.heading`，就是写一个方法们重新定义对`#`这种标签的解析。代码如下：

```js
const tocify = new Tocify()
renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
```

最后在需要显示文章导航的地方，写下面的代码:

```js
<div className="toc-list">
  {tocify && tocify.render()}
</div>
```

这里为了你方便学习，给出`detailed.js`全部代码。

```js
import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col ,Affix, Icon ,Breadcrumb  } from 'antd'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'




const Detailed = (props) =>{

  let articleContent=props.article_content

  const tocify = new Tocify()
  const renderer = new marked.Renderer();
    renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

  marked.setOptions({

    renderer: renderer,

    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,

    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 



    let html = marked(props.article_content) 




  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                  <Breadcrumb.Item> {props.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                {props.title}
                </div>

                <div className="list-icon center">
                  <span><Icon type="calendar" /> {props.addTime}</span>
                  <span><Icon type="folder" /> {props.typeName}</span>
                  <span><Icon type="fire" /> {props.view_count}</span>
                </div>

                <div className="detailed-content"  
                  dangerouslySetInnerHTML = {{__html:html}}   >


                </div>

             </div>

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>

            </div>
          </Affix>

        </Col>
      </Row>
      <Footer/>

   </>
  )

} 

Detailed.getInitialProps = async(context)=>{

  console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{

    axios('http://127.0.0.1:7001/default/getArticleById/'+id).then(
      (res)=>{
        // console.log(title)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed
```

这样就完成了前端详细文章页面的文章导航，可以预览一下效果。