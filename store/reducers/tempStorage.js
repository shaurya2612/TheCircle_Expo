import {
  FETCH_TEMP_USER_DATA,
  FETCH_TEMP_USER_IMAGES,
  FETCH_TEMP_USER_PROFILE_DATA,
  FETCH_CURRENT_USER_DATA,
  FETCH_CURRENT_USER_IMAGES,
  FETCH_CURRENT_USER_PROFILE_DATA,
  FETCH_CURRENT_USER_GENDER,
  FETCH_CURRENT_USER_IMAGES_ORDER,
  FETCH_CURRENT_USER_ABOUT,
  FETCH_CURRENT_USER_CARDS,
} from "../actions/tempStorage";

initialState = {
  currentUser: { null: true },
  currentUserImages: [],
  currentUserImagesOrder: [],
  currentUserAbout: { null: true },
  currentUserCards: { null: true },
  currentUserGender: { null: true },
  tempUser: { null: true },
  tempImages: [],
  tempUserProfileData: { null: true },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_DATA:
      return { ...state, currentUser: action.data };
    case FETCH_TEMP_USER_DATA:
      if (action.data != null) {
        return { ...state, tempUser: action.data };
      } else {
        return { ...state, tempUser: { null: true } };
      }
    case FETCH_TEMP_USER_IMAGES:
      return { ...state, tempImages: action.images };
    case FETCH_TEMP_USER_PROFILE_DATA:
      // sorting cards according to pos
      if (action.data) {
        if (action.data.cards) {
          let cardsArr = Object.entries(action.data.cards);
          cardsArr.sort((a, b) => {
            return a[1].pos - b[1].pos;
          });
          let sortedCards = {};
          cardsArr.forEach((item) => {
            sortedCards[item[0]] = item[1];
          });
          console.log("sorted cards", sortedCards);
          action.data.cards = sortedCards;
        }
        //////////////////////////////////
        return { ...state, tempUserProfileData: action.data };
      } else {
        return { ...state, tempUserProfileData: { null: true } };
      }
    case FETCH_CURRENT_USER_IMAGES:
      return { ...state, currentUserImages: action.images };
    case FETCH_CURRENT_USER_ABOUT:
      return { ...state, currentUserAbout: action.data };
    case FETCH_CURRENT_USER_CARDS:
      // sorting cards according to pos
      if (action.data) {
        let cardsArr = Object.entries(action.data);
        cardsArr.sort((a, b) => {
          return a[1].pos - b[1].pos;
        });
        let sortedCards = {};
        cardsArr.forEach((item) => {
          sortedCards[item[0]] = item[1];
        });
        console.log("sorted cards", sortedCards);
        action.data.cards = sortedCards;

        //////////////////////////////////
        return { ...state, currentUserCards: action.data.cards };
      } else {
        return { ...state, currentUserProfileData: { null: true } };
      }
    case FETCH_CURRENT_USER_GENDER:
      return { ...state, currentUserGender: action.data };
    case FETCH_CURRENT_USER_IMAGES_ORDER:
      return { ...state, currentUserImagesOrder: action.data };
    default:
      return state;
  }
};
