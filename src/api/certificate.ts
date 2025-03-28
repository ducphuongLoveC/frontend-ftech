import axiosInstance from './axiosInstance';

export const getCertificateByCertificateId = async (certificate_code: string) => {
  try {
    const { data } = await axiosInstance.get(`api/certificate/${certificate_code}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createCertificate = async (payload: {}) => {
  try {
    const { data } = await axiosInstance.post('api/certificate/', payload);

    if (data.isExist) {
      return data;
    }
    return data.data;
  } catch (error) {
    throw error;
  }
};
