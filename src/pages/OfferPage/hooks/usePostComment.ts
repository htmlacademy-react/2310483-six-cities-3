import { CommentData } from '../../../shared/api/type';
import { useState } from 'react';
import { api } from '../../../shared/api/services/api';
import { ApiPaths } from '../../../shared/api/const';

type UsePostCommentReturnType = {
  postComment: (commentData: CommentData, id: string) => Promise<void>;
  isPosting: boolean;
  isUpdated: boolean;
}

export const usePostComment = (): UsePostCommentReturnType => {
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const postComment = async (commentData: CommentData, id: string): Promise<void> => {
    setIsPosting(true);
    try {
      const {status} = await api.post<CommentData>(`${ApiPaths.Comments}/${id}`, commentData);
      if (status === 201) {
        setIsUpdated(true);
      }
    } finally {
      setIsPosting(false);
    }
  };

  return {
    postComment,
    isPosting,
    isUpdated
  };
};
