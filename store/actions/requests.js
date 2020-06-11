import firebase from 'firebase'

export const FETCH_REQUESTS = "FETCH_REQUESTS";
export const SEND_REQUEST = "SEND_REQUEST";


export const fetchRequests = () =>{
    var requestsList =[];
    return async (dispatch, getState) =>{
        const uid = getState().auth.user.uid
          firebase.database().ref('/requests/'+uid).on("value", snapshot=>{
                    if(snapshot.val()==null) {dispatch({type:FETCH_REQUESTS, requests: requestsList}); return}
                    Promise.all(Object.keys(snapshot.val()).map( async (key) => {
                    (await firebase.database().ref('/users/'+key).once("value", snapshot=>{
                    requestsList.push({ id: key, ...snapshot.val()});
                }))
            })).then(()=>{dispatch({type:FETCH_REQUESTS, requests: requestsList})});
    })
    }
}

