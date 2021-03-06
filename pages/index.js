import React,{useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {Row, Col, List} from 'antd'
import {CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'

// import comms from '../comms/Home.module.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import servicePath from '../config/apiUrl';


function Home(list) {
  const [mylist, setMylist] = useState(list.data)
  const renderer = new marked.Renderer()

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
  
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div className="list-header">最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item=>(
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed', query:{id:item.Id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined />{item.addTime}</span>
                  <span><FolderOutlined />{item.typeName}</span>
                  <span><FireOutlined />{item.view_count}人</span>
                </div>
                <div className="list-context" 
                  dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advert/>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default Home