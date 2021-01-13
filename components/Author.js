import React from 'react'
import {Avatar, Divider, Tooltip} from 'antd'
import {GithubOutlined, QqOutlined} from '@ant-design/icons'
import style from '../styles/components/Author.module.css'

function Author() {
    return (
        <div className={style.authorDiv + ' ' + style.commBox}>
            <div> <Avatar size={100} src="https://avatars0.githubusercontent.com/u/62535769?s=60&v=4"></Avatar></div>
            <div className={style.authorIntroduction}>
                一个前端小白，目前还在上学中，欢迎访问我的博客
                <Divider>社交账号</Divider>
                <a href="https://github.com/spcming" target="_blank"><Tooltip title="https://github.com/spcming"><Avatar size={28} icon={<GithubOutlined />} className={style.account} /></Tooltip></a>
                <Tooltip title="QQ: 1206710179"><Avatar size={28} icon={<QqOutlined />} className={style.account} /></Tooltip>
            </div>
        </div>        
    )
}

export default Author
