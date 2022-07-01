import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import BookingPage from "./modules/Booking/BookingPage";
import CalendarPage from "./modules/Calendar/CalendarPage";
import CheckInPage from "./modules/Checkin/CheckInPage";

function App({ store, basename }) {
  const [NameCurrent, setNameCurrent] = useState("");
  useEffect(() => {
    const URL_STRING = window.location.href;
    var URL_NEW = new URL(URL_STRING);
    var IsPop = URL_NEW.searchParams.get("ispop");
    var IsCheckin = URL_NEW.searchParams.get("ischeckin");
    if (IsPop) {
      setNameCurrent("POPUP");
    }
    if (IsCheckin) {
      setNameCurrent("CHECKIN");
      window.top &&
        window.top.SideBarCheckInReady &&
        window.top.SideBarCheckInReady();
    }
  }, [])
  return (
    <Provider store={store}>
      {!NameCurrent && <CalendarPage />}
      {NameCurrent === "POPUP" && <BookingPage />}
      {NameCurrent === "CHECKIN" && <CheckInPage />}
      <ToastContainer />
    </Provider>
  );
}

export default App;
