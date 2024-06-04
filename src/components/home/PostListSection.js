import React from "react";
import styled from "styled-components";
import PostItem from "./PostItem";
import { useState, useEffect } from "react";
import { instance } from "../../api/instance";
import { useSearchParams } from "react-router-dom";

function PostListSection() {
  const [postList, setPostList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchPostData = async () => {
      const params = {
        order_by:
          searchParams.get("sortType") === "popular" ? "likes" : "created_at",
        page: 1,
      };
      const res = await instance.get("board/post-list/", { params });
      setPostList(res.data.results);
    };
    fetchPostData();
  }, [searchParams]);

  return (
    <PostItemContainer>
      <ScrollContainer>
        {postList.map((item) => (
          <PostItem
            id={item.id}
            key={item.id}
            comments_count={item.comments_count}
            created_at={item.created_at}
            likes_count={item.likes_count}
            title={item.title}
            user={item.user}
          />
        ))}
      </ScrollContainer>
    </PostItemContainer>
  );
}

const PostItemContainer = styled.div`
  padding: 1.5rem;
`;

const ScrollContainer = styled.div`
  height: calc(100vh - 16rem);
  overflow: scroll;
`;

export default PostListSection;
