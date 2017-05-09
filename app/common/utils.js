/**
 * Created by haifeng on 17/2/22.
 */
let Util = {
    fetchData: (url, method, successCallback, failCallback) => {
        fetch(url, {
            method: method
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                successCallback(responseJSON);
            })
            .catch((err) => {
                failCallback(err);
            });
    },
    NaviGoBack: (navigator) => {
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return
        }
    }
};
export default Util