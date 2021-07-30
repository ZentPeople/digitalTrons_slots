import {post, get} from '../slotsApi';

export const getUser = async ({phoneNumber}) => {
  try {
    const {data} = await get(`/user?phoneNumber=${phoneNumber}`);
    return data.body.user;
  } catch (err) {
    throw err;
  }
};
