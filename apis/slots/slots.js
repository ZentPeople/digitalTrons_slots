import {post, get} from '../slotsApi';

export const getSlotsAPI = async () => {
  try {
    let {data} = await get(`/slots`);
    const {slots} = data.body;

    return slots;
  } catch (err) {
    throw err;
  }
};

export const bookSlotsAPI = async ({
  startTime,
  phoneNumber,
  firstName,
  lastName,
}) => {
  try {
    const {data} = await post(`/slots`, {
      startTime: new Date(startTime).getTime(),
      user: {
        phoneNumber,
        firstName,
        lastName,
      },
    });
    console.log(`data`, data);
    const {error, body} = data;

    if (error.description) {
      throw error.description;
    }

    const {slot} = body;
    return slot;
  } catch (err) {
    throw err;
  }
};
