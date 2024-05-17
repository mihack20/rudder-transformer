import axios from 'axios';
import { RespStatusError, RetryRequestError } from '../utils.ts';

const OPENFAAS_GATEWAY_URL = process.env.OPENFAAS_GATEWAY_URL || 'http://localhost:8080';
const OPENFAAS_GATEWAY_USERNAME = process.env.OPENFAAS_GATEWAY_USERNAME || '';
const OPENFAAS_GATEWAY_PASSWORD = process.env.OPENFAAS_GATEWAY_PASSWORD || '';

const basicAuth = {
  username: OPENFAAS_GATEWAY_USERNAME,
  password: OPENFAAS_GATEWAY_PASSWORD,
};

const parseAxiosError = (error) => {
  if (error.response) {
    const status = error.response.status || 400;
    const errorData = error.response?.data;
    const message =
      (errorData && (errorData.message || errorData.error || errorData)) || error.message;
    return new RespStatusError(message, status);
  }
  if (error.request) {
    return new RetryRequestError(error.message);
  }
  return error;
};

export const deleteFunction = async (functionName) =>
  new Promise((resolve, reject) => {
    const url = `${OPENFAAS_GATEWAY_URL}/system/functions`;
    axios
      .delete(url, { data: { functionName }, auth: basicAuth })
      .then(() => resolve())
      .catch((err) => reject(parseAxiosError(err)));
  });

export const getFunction = async (functionName) =>
  new Promise((resolve, reject) => {
    const url = `${OPENFAAS_GATEWAY_URL}/system/function/${functionName}`;
    axios
      .get(url, { auth: basicAuth })
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(parseAxiosError(err)));
  });

export const getFunctionList = async () =>
  new Promise((resolve, reject) => {
    const url = `${OPENFAAS_GATEWAY_URL}/system/functions`;
    axios
      .get(url, { auth: basicAuth })
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(parseAxiosError(err)));
  });

export const invokeFunction = async (functionName, payload) =>
  new Promise((resolve, reject) => {
    const url = `${OPENFAAS_GATEWAY_URL}/function/${functionName}`;
    axios
      .post(url, payload, { auth: basicAuth })
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(parseAxiosError(err)));
  });

export const checkFunctionHealth = async (functionName) => {
  return new Promise((resolve, reject) => {
    const url = `${OPENFAAS_GATEWAY_URL}/function/${functionName}`;
    axios
      .get(
        url,
        {
          headers: { 'X-REQUEST-TYPE': 'HEALTH-CHECK' },
        },
        { auth: basicAuth },
      )
      .then((resp) => resolve(resp))
      .catch((err) => reject(parseAxiosError(err)));
  });
};

export const deployFunction = async (payload) =>
  new Promise((resolve, reject) => {
    const url = `${OPENFAAS_GATEWAY_URL}/system/functions`;
    axios
      .post(url, payload, { auth: basicAuth })
      .then((resp) => resolve(resp.data))
      .catch((err) => {
        reject(parseAxiosError(err));
      });
  });
