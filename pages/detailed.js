import Head from 'next/head'
import {Row, Col, Breadcrumb, Affix} from 'antd'
import {CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import style from '../styles/pages/detailed.module.css'

import Tocify from '../components/tocify.tsx';
import servicePath from '../config/apiUrl';

function Detailed(props) {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()

  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer:renderer,
    gfm:true, // 是否使用github标准解析markdown
    pedantic:false, // 是否开启markdown的严格模式
    sanitize:false, // 是否忽略HTML标签
    tables:true, // 是否解析表格（根据github标准，同时gfm必须为true
    breaks:false, // 是否支持github换行符
    smartLists:true, // 是否自动渲染列表
    highlight:function(code){ // 如何进行代码高亮
      return hljs.highlightAuto(code).value
    }
  })
  let html = marked(props.article_content)

  return (
    <div>
      <Head>
        <title>Detailed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href={`/list?id=${props.typeId}`}>{props.typeName}</a></Breadcrumb.Item>
              <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className={style.detailedTitle}>
              {props.title}
            </div>
            <div className="list-icon center">
              <span><CalendarOutlined/>{props.addTime}</span>
              <span><FolderOutlined/>{props.typeName}</span>
              <span><FireOutlined/>{props.view_count}人</span>
            </div>
            <div className={style.detailedContent}
              dangerouslySetInnerHTML={{__html:html}}
            >
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advert/>
          <Affix offsetTop={5}>
            <div className={style.detailedNav + ' comm-box'}>
              <div className={style.navTitle}>文章目录</div>
              {
                tocify && tocify.render()
              }
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

Detailed.getInitialProps = async(context)=>{
  let promise = new Promise((resolve)=>{
    axios(servicePath.getArticleById + context.query.id).then(res=>{
      resolve(res.data.data[0])
    })
  })
  return await promise
}
export default Detailed