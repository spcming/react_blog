import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import {Row, Col, Breadcrumb} from 'antd'
import {CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import style from '../styles/pages/detailed.module.css'

export default function Detailed() {
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
              markdown内容
            </div>
          </div>
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
