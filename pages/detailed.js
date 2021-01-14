import {useEffect} from 'react'
import Head from 'next/head'
import {Row, Col, Breadcrumb, Affix} from 'antd'
import {CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import MarkNav from 'markdown-navbar'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import style from '../styles/pages/detailed.module.css'


export default function Detailed() {
  const markdown = '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '```js \n  var a=11;  \n```'
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
              <Breadcrumb.Item><a href="/">视频列表</a></Breadcrumb.Item>
              <Breadcrumb.Item>xxxxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className={style.detailedTitle}>
              React实战视频教程
            </div>
            <div className="list-icon center">
              <span><CalendarOutlined/>2021/1/13</span>
              <span><FolderOutlined/>视频教程</span>
              <span><FireOutlined/>1人</span>
            </div>
            <div className={style.detailedContent}>
              <ReactMarkdown plugins={[gfm]}>{markdown}</ReactMarkdown>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advert/>
          <Affix offsetTop={5}>
            <div className={style.detailedNav + ' comm-box'}>
              <div className={style.navTitle}>文章目录</div>
              <MarkNav
                className={style.articleMenu}
                source={markdown}
                headingTopOffset={0} // 默认是0
                ordered={false}
              />
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}
