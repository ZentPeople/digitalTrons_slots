import {BOOK_SLOT, GET_SLOTS} from '../types/slots';

const initialState = {
  slots: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_SLOTS:
      return {...state, slots: actions.slots};
    case BOOK_SLOT:
      // console.log(`actions.dateKey`, actions.dateKey);
      // console.log(`actions.oldID`, actions.oldID);

      let newSlots = {...state.slots};
      let newDateSlots = newSlots[actions.dateKey];
      const index = newDateSlots.findIndex(({_id}) => _id == actions.oldID);
      newDateSlots[index] = actions.slot;
      // console.log(`newDateSlots`, newDateSlots);
      newSlots[actions.dateKey] = newDateSlots;
      // console.log(`newSlots`, newSlots);

      return {...state, slots: newSlots};
  }

  return state;
};
