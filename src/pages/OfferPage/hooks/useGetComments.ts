import { Comment } from '../../../shared/api/models';
import { useState, useEffect } from 'react';
import { api } from '../../../shared/api/services/api';
import { ApiPaths } from '../../../shared/api/const';

export const useGetComments = (id: string, isUpdated: boolean) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(
    () => {
      const fetchData = async () => {
        const {data} = await api.get<Comment[]>(`${ApiPaths.Comments}/${id}`);
        setComments(data);
      };
      fetchData();
    },
    [id, isUpdated]
  );

  return comments;
};
