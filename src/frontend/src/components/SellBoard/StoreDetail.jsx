import React, { useEffect, useState } from "react";
import { images } from '../../assets/images';
import { useNavigate, useParams } from "react-router-dom";

const StoreDetail = () => {
  const [pictureNum, setpictureNum] = useState("");
  const [like, setlike] = useState(false);
  const [login, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState("현재 로그인한 사용자 정보");
  const [postAuthor, setPostAuthor] = useState("게시글 작성자 정보");
  const isAuthor = currentUser === postAuthor; 
  const [showModal, setShowModal] = useState(false)

  const { postId } = useParams();
  console.log(postId)
  const picturePlusBtn = () => {
    setpictureNum((pictureNum + 1) % "사진수");
  };
  const pictureMinusBtn = () => {
    setpictureNum((pictureNum + "사진수" - 1) % "사진수");
  };
  const likeBtn = () => {
    setlike(!like);
  };
  const goDelete = () => {
    setShowModal(true);
  }
  const navigate = useNavigate();
  const handleConfirmDelete = () => {
    setShowModal(false)
    // 서버에 글 삭제 요청
    navigate("/store")
  }
  const handleCancel = () => {
    setShowModal(false)
  }

  const goProfile = () => {
    navigate("/profile");
  };
  const goChat = () => {
    if (login) {
        // 채팅 연결
    } else {
        alert('로그인하세요')
        navigate("/login")
    }
  }
  const goList = () => {
    navigate("/store")
  }
  const goUpdate =() => {
    if ('대기중') {
      navigate(`/update/${postId}`)
    }
  }

  useEffect(() => {
    if (like) {
      // 저장소에 관심상품 등록
    } else {
      // 저장소에서 제거
    }
  }, [like]);

  return (
    <div>
      <div>
        <img src="" alt="" />
        <button onClick={picturePlusBtn}>{">"}</button>
        <button onClick={pictureMinusBtn}>{"<"}</button>
        {/* 부트스트랩인가? */}
      </div>
      <div>
        <div onClick={goProfile}>
          <img src="" alt="" />
          {/* 서버에서 사진 받아와서 등록 */}
          <p>{"작성자"}작성자</p>
        </div>
        <div>
          <p>
            최소 ${"min"}일 / 최대 ${"max"}일
          </p>
          <p>
            ${"min"}원 / ${"max"}원
          </p>
        </div>
      </div>
      <div>
        <div>
          <p>{"title"}한성 무접점 키보드 대여합니다!~!</p>
          <p>
            ${"product"} / ${"day"}
          </p>
        </div>
        {!isAuthor && (like ? (
          <img
            src={images.like}
            alt="React"
            onClick={likeBtn}
          />
        ) : (
          <img src={images.notlike} alt="React" onClick={likeBtn} />
        ))}
      </div>
      <div>
        <p>{"content"} 이걸 안씀?</p>
      </div>
      <div>
        <div>
          <p>
            조회수 ${"see"} 관심 ${"like"}
          </p>
        </div>
      </div>
      <div>
        {isAuthor ? (
          <div>
            <button onClick={goChat}>거래 요청</button>
            <button onClick={goList}>목록</button>
          </div>
        ) : (
          <div>
            <button onClick={goDelete}>삭제</button>
            <button onClick={goUpdate}>수정</button>
            <button onClick={goList}>목록</button>
          </div>
        )}
      </div>
      {showModal && (
        <div>
            <p>삭제</p>
            <p>정말 삭제하시겠습니까?</p>
            <div>
                <button onClick={handleConfirmDelete}>삭제</button>
                <button onClick={handleCancel}>취소</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default StoreDetail;
