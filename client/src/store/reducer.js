const initialState = {
    showPopup: false,
    popupTitle: null,
    popupContent: null,
    popupList: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'TOGGLE_POPUP':
            return {
                ...state,
                showPopup: !state.showPopup,
                popupTitle: action.title,
                popupContent: action.content,
                popupList: action.list
            }
    }

    return state;
}

export default reducer;