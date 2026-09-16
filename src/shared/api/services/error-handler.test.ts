import { AxiosHeaders, AxiosResponse } from 'axios';
import { ErrorDetailsMessage } from './api';
import { toast } from 'react-toastify';
import { errorHandler } from './error-handler';

describe('error-handler', () => {
  it('Should call toast.warn with response message if response status is 400', () => {
    const toastWarn = vi.spyOn(toast, 'warn');

    const response: AxiosResponse<ErrorDetailsMessage> = {
      status: 400,
      data: {
        errorType: '',
        message: '',
        details: [
          {
            property: '',
            value: '',
            messages: ['Bad request'],
          },
        ],
      },
      statusText: '',
      headers: {},
      config: {
        headers: {} as AxiosHeaders
      }
    };

    errorHandler(response);

    expect(toastWarn).toBeCalledTimes(1);
    expect(toastWarn).toHaveBeenCalledWith('Bad request');

    toastWarn.mockRestore();
  });
});
