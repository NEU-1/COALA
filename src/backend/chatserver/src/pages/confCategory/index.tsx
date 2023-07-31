import React, { useEffect } from 'react';
import Link from 'next/link'


const confCategory = () => {
    console.log("hello world~~!")

    useEffect(() => {
        // Create - body 의 raw데이터로 정보를 받음
        // fetch("/api/receiveDB/category",{
        //     method:'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name: '기타',
        //     }),
        // });
        // Read
        fetch("/api/receiveDB/category");
        // Update

        // Delete - 쿼리 데이터로 전송받음
        // fetch("/api/receiveDB/category?id=3",{
        //     method:'DELETE'
        // });
    }, []);

    return (
        <>
            <Link href="/">Link to Home Page</Link>
            <div>
                <h1>/list/page.tsx</h1>
                안녕하세용 리스트에용
            </div>
        </>
    );
};

export default confCategory;