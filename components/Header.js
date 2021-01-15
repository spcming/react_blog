import React,{useState, useEffect} from 'react'
import style from '../styles/components/Header.module.css'
import {Row, Col, Menu} from 'antd'
import {HomeOutlined, SmileOutlined, YoutubeOutlined} from '@ant-design/icons'
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import servicePath from '../config/apiUrl';


function Header() {
    const [navArray, setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo)
            setNavArray(result.data.data)
        }
        fetchData()
    }, [])

    const handleClick = (e)=>{
        if(e.key == 0){
            Router.push('/')
        }else{
            Router.push('/list?id=' + e.key)
        }
    }
    return (
        <div className={style.header}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12} >
                    <span className={style.headerLogo}>spcming</span>
                    <span className={style.headerTxt}>一个前端小白</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" className={style.antMenu} onClick={handleClick}>
                        <Menu.Item key="0">
                            首页
                        </Menu.Item>
                        {
                            navArray.map((item)=>{
                                return(
                                    <Menu.Item key={item.Id}>
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            }) 
                        }
                        
                        
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header
