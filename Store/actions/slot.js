import {bookSlotsAPI, getSlotsAPI} from '../../apis/slots/slots';
import {BOOK_SLOT, GET_SLOTS} from '../types/slots';

export const getSlots = () => {
  return async dispatch => {
    try {
      const slots = await getSlotsAPI();
      if (slots.length < 1) {
        return dispatch({
          type: GET_SLOTS,
          slots: slots,
        });
      }

      let bookedSlotsMap = {};
      let groups = {};

      const groupDate = slot => {
        const d = new Date(slot.slotStartTime).toLocaleString();
        const date = d.split(',')[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(slot);
      };

      const now = new Date();
      const slotEndTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 10,
        23,
        0,
        0,
        0,
      );

      const nextHour = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() + 1,
        0,
        0,
        0,
      );

      slots.forEach(slot => {
        const date = new Date(slot.slotStartTime);
        bookedSlotsMap[date.getTime()] = true;
        if (date.getTime() < nextHour.getTime()) groupDate(slot);
      });
      for (
        let i = nextHour.getTime();
        i <= slotEndTime.getTime();
        i += 3600000
      ) {
        const date = new Date(i);

        if (date.getHours() >= 9 && date.getHours() <= 17) {
          if (bookedSlotsMap[i]) {
            const index = Object.keys(bookedSlotsMap).findIndex(
              key => key == i,
            );
            groupDate(slots[index]);
          } else {
            groupDate({
              _id: i,
              slotStartTime: new Date(i),
              slotEndTime: new Date(i + 3600000),
              status: 'OPEN',
              user: {},
            });
          }
        }
      }
      dispatch({
        type: GET_SLOTS,
        slots: groups,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const bookSlot = ({
  startTime,
  firstName,
  lastName,
  phoneNumber,
  dateKey,
  oldID,
}) => {
  return async dispatch => {
    try {
      const slot = await bookSlotsAPI({
        startTime,
        firstName,
        lastName,
        phoneNumber,
      });
      console.log(`slot`, slot);

      dispatch({
        type: BOOK_SLOT,
        slot,
        dateKey,
        oldID,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
