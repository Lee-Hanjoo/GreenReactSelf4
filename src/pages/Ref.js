import React, { useRef, useState } from 'react'

const Ref = () => {
    const [data, setData] = useState([]); 
    const [active, setActive] = useState(false); 
  return (
    <div className='ref-wrap'>
        <button className='plus-btn' onClick={()=>{setActive(!active)}}>+</button>
        <div className={`contents ${active ? 'on' : ''}`}>
            <Insert setData={setData} />
            <List data={data} setData={setData}/>
        </div>
    </div>
  )
}

let Insert = ({setData}) => {
    // 하나면 배열 아니어도 되는데 name = ... current 넣어줘야함
    // '이름' ref={(e)=>{in... = e}} 도 안해도 됨.
    let insertItemRef = useRef();

    let userName = (e) => {
        e.preventDefault();

        let name = insertItemRef.current.value;

        setData((usuallyData)=>{
            // name을 계속 쌓아줘야함.
            return[...usuallyData, {name}]
        })

        e.target.reset()
        insertItemRef.current.focus()
    }
    return (
        <div className='insert-wrap'>
            <h2>참여자 등록</h2>
            <div className='input-wrap'>
                <form onSubmit={userName}>
                    <input type="text" placeholder='이름' ref={insertItemRef} />
                    <input type='submit' value={`저장하기`}/>
                </form>
            </div>
        </div>
    )
}

let List = ({data, setData}) => {
    let listItemRef = useRef([]);
    let listItem = data.map((obj,i)=>{
        let delFun = (e) => {
            listItemRef.current.splice(i, 1)
            //usuallyData는 지금의 데이터. 지금의 데이터를 필터로 가공해서 다시 data에 넣어줄거임. 
            setData((usuallyData) => usuallyData.filter((_, index) => index !== i));
        }
        return  <li ref={(li)=>{listItemRef.current[i] = li}} key={i}>
                    <p>{i + 1}. {obj.name}</p>
                    <button type='button' className='delete-btn' onClick={delFun}>삭제</button>
                </li>
    })
    return (
        <div className='list-wrap'>
            <h2>참여인원: {data.length}명</h2>
            <ul>
                {listItem}
            </ul>
        </div>
    )
}

export default Ref