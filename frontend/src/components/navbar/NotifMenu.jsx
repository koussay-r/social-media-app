import {BsBellFill} from "react-icons/bs"
import React from 'react';
import { useSelector } from 'react-redux';
import {  SmileOutlined } from '@ant-design/icons';
import { ConfigProvider, Dropdown } from 'antd';
const items = [
    {
        key: '1',
        label: (
            <a  target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
    
},
{
    key: '2',
    label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
},
{
    key: '3',
    label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
},
{
    key: '4',
    danger: true,
    label: 'a danger item',
},
];
export default function NotifMenu() {
    const state=useSelector(state=>state.user.value)
    return(   
        <>
    <Dropdown
    theme={'dark'}
    menu={{
        items,
    }}
    trigger={['click']}
    placement="bottomRight"
      arrow={{
        pointAtCenter: true,
      }}
    color="black"
    >
    <a onClick={(e) => e.preventDefault()}>
<BsBellFill  className={` ${state.nightDayMode===false?"text-black/80":"text-white "}  mt-4 cursor-pointer`} size={"21"}/>
    </a>
  </Dropdown>
        </>   
        )
};
