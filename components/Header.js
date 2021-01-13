import React from 'react'
import style from '../styles/components/Header.module.css'
import {Row, Col, Menu} from 'antd'
import {HomeOutlined, SmileOutlined, YoutubeOutlined} from '@ant-design/icons'

function Header() {
    return (
        <div className={style.header}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12} >
                    <span className={style.headerLogo}>spcming</span>
                    <span className={style.headerTxt}>一个前端小白</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" className={style.antMenu}>
                        <Menu.Item key="home">
                            <HomeOutlined />
                            首页
                        </Menu.Item>
                        <Menu.Item key="video">
                            <YoutubeOutlined />
                            视频
                        </Menu.Item>
                        <Menu.Item key="life">
                            <SmileOutlined />
                            生活
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header
