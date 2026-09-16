import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { ErrorDetailsMessage } from './api';

export const errorHandler = (response: AxiosResponse<ErrorDetailsMessage>): void => {
  const status = response?.status;

  if (status === 400) {
    toast.warn(response?.data.details[0].messages[0]);
  }
};
